/**
 *
 * AgoraRecording container
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
import {
  getPerformanceInfo,
  getPerformanceJoinToken,
} from './state/agoraRecording.actions';
import reducer from './state/agoraRecording.reducer';
import saga from './state/agoraRecording.saga';
import { injectReducer, injectSaga } from './agoraRecording.dependencies';
import './agoraRecording.scss';

import Perform from '../../utils/perform';
import { Audience } from './screens/audience/audience';
import { firebaseClient } from '../../utils/firebase';

export const AgoraRecording = props => {
  const [isPerformer, setPerformer] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  // Get Performance Data
  useEffect(() => {
    // get the performance info
    dispatch(getPerformanceInfo({ paramsToReplace: { id } }));

    return () => {
      if (window.perform) {
        window.perform.leaveRTC();
      }
      window.perform = null;
    };
  }, []);

  // Fetch Performance Channel Token
  useEffect(
    () => {
      if (
        props.performanceData &&
        props.performanceData.state === AppConstants.PERFORMANCE_STATUS.PAST
      ) {
        // redirect back to home
        // history.push('/');
      }

      if (props.performanceData) {
        const role = 'audience';

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

        if (!window.perform) {
          window.perform = new Perform({
            globalChannel: props.performanceData.channelName,
            channelToken: props.channelToken,
          });
          firebaseClient._channel = props.performanceData.channelName;
          const user = {};
          user.userId = 0;

          user.isPerformer = false;
          window.perform.setAuthUser(user);
          setPerformer(false);
        }
      }
    },
    [props.channelToken, props.performanceData],
  );

  return (
    <>
      {window.perform && <Audience performanceData={props.performanceData} />}
    </>
  );
};

AgoraRecording.propTypes = {
  performanceData: PropTypes.object,
  channelToken: PropTypes.string,
};

const mapStateToProps = state => ({
  performanceData: _get(state.agorarecording, 'performanceData', null),
  channelToken: _get(state.agorarecording, 'channelToken', null),
});

const mapDispatchToProps = dispatch => ({
  defaultAction: payload => dispatch(defaultAction(payload)),
});

const withReducer = injectReducer({ key: 'agorarecording', reducer });
const withSaga = injectSaga({ key: 'agorarecording', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AgoraRecording);
