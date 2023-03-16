import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../../components/Common/Button';
import { PerformerConstants } from '../../performer.constants';
import { startRecording, queryRecording } from '../../state/performer.actions';
import usePerformer from '../../../../hooks/usePerformer';
const Recording = () => {
  const [recordingState, setRecordingState] = useState(
    PerformerConstants.RECORDING_STATE.NOT_STARTED,
  );

  const [maxRetry, setMaxRetry] = useState(2);
  const [activeCloudDomain, setCloudDomain] = useState('api.agora.io');
  const [queryStatus, setQueryStatus] = useState('');

  const dispatch = useDispatch();
  const startRecordingInfo = useSelector(
    state => state.performer.recordingData,
  );
  const channelToken = useSelector(state => state.performer.recordingToken);

  const performer = usePerformer();

  const intervalRef = useRef(null);

  const handleRecording = () => {
    if (recordingState === PerformerConstants.RECORDING_STATE.STARTED) {
      stopPLRecording();
    } else {
      startPLRecording();
    }
  };

  const startPLRecording = domain => {
    setQueryStatus('inProgress');
    dispatch(
      startRecording({
        queryParams: {
          channelName: window.perform.eventChannelName,
          uid: (!domain && startRecordingInfo.uid) || '',
          cloudDomain: domain || activeCloudDomain,
        },
      }),
    );
    subscribeToQueryRecording();
  };

  const stopPLRecording = () => {
    performer.stopRecording({
      ...startRecordingInfo,
      callback: handleRecordingStop,
    });
    clearInterval(intervalRef.current);
  };

  const queryRecordingStatus = () => {
    dispatch(
      queryRecording({
        queryParams: {
          resourceId: startRecordingInfo.resourceId,
          sid: startRecordingInfo.sid,
          mode: 'web',
          cloudDomain: activeCloudDomain,
        },
        callback: handleRecordingStatus,
      }),
    );
  };

  const handleRecordingStatus = recordingStatus => {
    if (recordingStatus) {
      // recording started successfully
      setRecordingState(PerformerConstants.RECORDING_STATE.STARTED);
      setQueryStatus('');
    } else if (recordingStatus === false) {
      // Recording start failed, use backoff stratgy
      // recording stopped
      // handleRecordingStop();
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // restart recording
      if (maxRetry) {
        setMaxRetry(prevState => prevState - 1);
        // check if recording already started and in-between recording stopped then wait for 30 sec
        startPLRecording();
      }
      // if maxRetry reach to 0 then try with different domain
      else if (activeCloudDomain === 'api.agora.io') {
        setCloudDomain('api.sd-rtn.com');
        setMaxRetry(2);
        startPLRecording('api.sd-rtn.com');
      }
    }
  };

  const handleRecordingStop = () => {
    setRecordingState(PerformerConstants.RECORDING_STATE.STOPPED);
  };

  const subscribeToQueryRecording = () => {
    // monitor the recording once it's started
    if (startRecordingInfo.resourceId && !intervalRef.current) {
      setQueryStatus('inProgress');
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        queryRecordingStatus();
      }, 15000);
    }
  };

  useEffect(
    () => {
      if (startRecordingInfo.resourceId) {
        subscribeToQueryRecording();
      } else {
        setRecordingState(PerformerConstants.RECORDING_STATE.NOT_STARTED);
      }
      return () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    },
    [startRecordingInfo.resourceId],
  );

  return (
    <>
      <Button
        className="recording-btn"
        onClick={handleRecording}
        disabled={queryStatus === 'inProgress'}
      >
        {recordingState === PerformerConstants.RECORDING_STATE.STARTED &&
          'Stop Recording'}
        {recordingState !== PerformerConstants.RECORDING_STATE.STARTED &&
          (queryStatus === 'inProgress' ? 'Starting' : 'Start Recording')}
      </Button>
    </>
  );
};

export default memo(Recording);
