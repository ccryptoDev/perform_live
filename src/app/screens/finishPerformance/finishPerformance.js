/**
 *
 * FinishPerformance container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { useParams } from 'react-router-dom';

import { defaultAction, getRecording } from './state/finishPerformance.actions';
import reducer from './state/finishPerformance.reducer';
import saga from './state/finishPerformance.saga';
import { injectReducer, injectSaga } from './finishPerformance.dependencies';

import '../../styles/content.scss';
import './finishPerformance.scss';

export const FinishPerformance = props => {
  const { id } = useParams();
  useEffect(() => {
    props.getRecording({ paramsToReplace: { id } });
  }, []);
  return (
    <div className="finish-performance">
      {!!props.recordingData.length && (
        <video
          src={props.recordingData[0].url}
          className="recording-video"
          muted
          controls
        />
      )}

      {!props.recordingData.length && (
        <div className="no-data">Recording is not available</div>
      )}
    </div>
  );
};

FinishPerformance.propTypes = {
  getRecording: PropTypes.func,
  recordingData: PropTypes.array,
};

const mapStateToProps = state => ({
  recordingData: _get(state.finishperformance, 'recordingData', []),
});

const mapDispatchToProps = dispatch => ({
  getRecording: payload => dispatch(getRecording(payload)),
});

const withReducer = injectReducer({
  key: 'finishperformance',
  reducer,
  blacklist: ['recordingData'],
});
const withSaga = injectSaga({ key: 'finishperformance', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FinishPerformance);
