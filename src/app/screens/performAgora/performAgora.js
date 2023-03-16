/**
 *
 * PerformAgora container
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import moment from 'moment';
import AppConstants from 'app/app.constants.json';
import reducer from './state/performAgora.reducer';
import saga from './state/performAgora.saga';
import { usePerformanceWatch } from '../../hooks/usePerformanceWatch.mutate';
import {
  getPerformanceJoinToken,
  resetPerformanceState,
  setTimeStamp,
  getPerformanceInfo,
} from './state/performAgora.actions';
import { injectReducer, injectSaga } from './performAgora.dependencies';
import Performer from './screens/performer/performer';
import Audience from './screens/audience/audience';
import {
  getPerformerProducts,
  getServerCurrentTime,
  updateFollowUnfollow,
} from '../../state/app.actions';

import Perform from '../../utils/perform';
import AuthService from '../../utils/authService';
import { firebaseClient } from '../../utils/firebase';

import './performAgora.scss';

export const PerformAgora = props => {
  const dispatch = useDispatch();
  // const handleFirebaseEvent = ({ type, value }) =>
  //   dispatch({ type: 'firebase/' + type, payload: value });

  // useEffect(() => {
  //   firebaseClient._emitter.on('child_added', handleFirebaseEvent);
  //   return () => {
  //     if (!firebaseClient) {
  //       return;
  //     }
  //     firebaseClient._emitter.off('child_added', handleFirebaseEvent);
  //   };
  // }, []);

  const timeStamp = moment()
    .utc()
    .format();
  dispatch(setTimeStamp({ timeStamp }));
  const history = useHistory();
  const { id } = useParams();
  const [isPerformer, setPerformer] = useState(null);

  // Get Performance Data
  useEffect(() => {
    // reset performance state
    props.resetPerformanceState();
    // get the performance info
    dispatch(getPerformanceInfo({ paramsToReplace: { id } }));
    // get server current time
    dispatch(getServerCurrentTime());
    return () => {
      if (window.perform) {
        window.perform.leaveRTC();
      }
      window.perform = null;
      // reset performance state
      props.resetPerformanceState();
    };
  }, []);

  // Fetch Performance Channel Token
  useEffect(
    () => {
      if (
        (props.performanceData !== null && !props.performanceData) ||
        (props.performanceData &&
          props.performanceData.state === AppConstants.PERFORMANCE_STATUS.PAST)
      ) {
        // redirect back to home
        history.push('/');
      }

      if (props.performanceData) {
        let role = 'audience';
        if (props.performanceData.performer.id === props.userInfo.id) {
          role = 'publisher';
        }
        // const uid = props.performanceData.performer.id;
        // get channel Token
        dispatch(
          getPerformanceJoinToken({
            queryParams: {
              channelName: props.performanceData.channelName,
              role,
              // uid,
            },
          }),
        );
      }
    },
    [props.performanceData],
  );

  // set performer and fetch performer products

  useEffect(
    () => {
      if (props.channelToken && props.performanceData) {
        // check if the logged in user is performer of this performance or audience
        let isPerformanceOwner = false;
        if (props.performanceData.performer.id === props.userInfo.id) {
          isPerformanceOwner = true;
        }

        setPerformer(isPerformanceOwner);
        // fetch all the products of this performer
        if (isPerformanceOwner) {
          props.getPerformerProducts();
        }

        if (!window.perform) {
          window.perform = new Perform({
            globalChannel: props.performanceData.channelName,
            channelToken: props.channelToken,
          });
          firebaseClient._channel = props.performanceData.channelName;
          const { user } = AuthService;
          if (isPerformanceOwner) {
            user.userId = props.performanceData.performer.id;
          } else {
            user.userId = props.userInfo.userId;
            // fetch perfomer follow info by audience
            dispatch(
              updateFollowUnfollow({
                paramsToReplace: { id: props.performanceData.performer.id },
                method: 'GET',
              }),
            );
          }
          user.isPerformer = isPerformanceOwner;
          window.perform.setAuthUser(user);
        }
      }
    },
    [props.channelToken, props.performanceData],
  );

  usePerformanceWatch(props.performanceData && props.performanceData.id);

  return (
    <>
      {isPerformer !== null &&
        window.perform &&
        (isPerformer ? (
          <Performer performanceData={props.performanceData} />
        ) : (
          <Audience performanceData={props.performanceData} />
        ))}
    </>
  );
};

PerformAgora.propTypes = {
  performanceData: PropTypes.object,
  userInfo: PropTypes.object,
  getPerformerProducts: PropTypes.func,
  channelToken: PropTypes.string,
  resetPerformanceState: PropTypes.func,
};

const mapStateToProps = state => ({
  performanceData: _get(state.performagora, 'performanceData', null),
  userInfo: _get(state.global, 'userInfo', {}),
  channelToken: _get(state.performagora, 'channelToken', null),
});

const mapDispatchToProps = dispatch => ({
  getPerformerProducts: payload => dispatch(getPerformerProducts(payload)),
  resetPerformanceState: payload => dispatch(resetPerformanceState(payload)),
});

const withReducer = injectReducer({
  key: 'performagora',
  reducer,
  blacklist: ['timeStamp', 'performanceData', 'channelToken'],
});
const withSaga = injectSaga({ key: 'performagora', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PerformAgora);
