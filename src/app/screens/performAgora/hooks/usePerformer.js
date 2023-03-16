import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseClient } from '../../../utils/firebase';
import { firebaseUtils } from '../../../utils/firebaseUtils';
import { PerformAgoraConstants } from '../performAgora.constants';
import {
  removeUser,
  setActiveInvitedAudience,
  setActiveStageAudience,
  setActiveStageUser,
  setStageRequest,
  stopRecording,
} from '../screens/performer/state/performer.actions';
import { updateAgoraAnalytics } from '../state/performAgora.actions';

export default function usePerformer() {
  const userInfo = useSelector(state => state.global.userInfo);
  const performerState = useSelector(state => state.performer || {});
  const prevStageRequest = performerState.stageRequest || {};
  const stageRequest = useRef(prevStageRequest);
  const dispatch = useDispatch();

  useEffect(
    () => {
      stageRequest.current = prevStageRequest;
    },
    [prevStageRequest.request],
  );

  // This method is responsible to kickout a stage user
  const kickoutUser = async userToRemove => {
    const messagedata = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.AUDIENCE_KICKED_FROM_STAGE,
      timeStamp: moment()
        .utc()
        .format(),
      messageData: {
        senderId: userInfo.id,
      },
    };
    firebaseClient.sendPeerMessage(userToRemove.id, messagedata);
    // remove user from firebase channel_state table
    await firebaseUtils.handleStageUser({ userId: userToRemove.id }, 'remove');
    const data = {
      state: 'removed',
      userDetials: {
        userId: userToRemove.id,
        displayName: userToRemove.displayName,
      },
    };
    dispatch(removeUser(data));

    // reset the user's data who has been removed from the stage
    dispatch(
      setActiveStageUser({
        active: false,
        data: {},
      }),
    );
    dispatch(setActiveStageAudience({ id: userToRemove.id, action: 'delete' }));
    dispatch(
      setActiveInvitedAudience({ id: userToRemove.id, action: 'delete' }),
    );
  };

  const rejectStageJoinReq = userId => {
    // check if already exist request belongs to this rejected user
    if (stageRequest.current.data.id === userId)
      dispatch(
        setStageRequest({
          request: false,
          data: {},
        }),
      );
    updateStageJoinReqFB(userId, false);
  };

  const acceptStageJoinReq = user => {
    const stageRequestData = performerState.stageRequest.data;
    dispatch(
      setStageRequest({
        request: false,
        data: {},
      }),
    );

    // save the user's data who is going to join the stage
    dispatch(
      setActiveStageUser({
        active: true,
        data: stageRequestData,
      }),
    );
    updateStageJoinReqFB(user.id, true);
    dispatch(setActiveStageAudience(user));
  };

  // internal used function which triggers signel to all other audience in channel
  const updateStageJoinReqFB = (userId, flag) => {
    const data = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES
          .PERFORMER_PROCESS_JOIN_REQUEST,
      timeStamp: moment()
        .utc()
        .format(),
      messageData: {
        isRequestApproved: flag,
      },
    };
    firebaseClient.sendPeerMessage(userId, data);
  };

  // This method is responsible live performance recording
  const stopPLRecording = recordingInfo => {
    dispatch(
      stopRecording({
        queryParams: {
          channelName: window.perform.eventChannelName,
          resourceId: recordingInfo.resourceId,
          sid: recordingInfo.sid,
          uid: recordingInfo.uid,
        },
        callback: recordingInfo.callback || null,
      }),
    );
  };

  // This method collect the Performance Analytics after performance finish and process to save to server
  const handleAnalytics = async performanceId => {
    const audienceList = await firebaseUtils.getChannelUsers();
    // get the session statistics
    const { client } = window.perform.getBordCastRTCClient();
    client.getSessionStats(stats => {
      saveAgoraAnalytics({
        id: performanceId,
        data: {
          endDatetime: moment().format(),
          videoSec: +stats.Duration,
          audioSec: 0,
          audienceCount: audienceList ? Object.keys(audienceList).length : 0,
        },
      });
    });
  };

  // Update the performance start time to agora analytics
  const saveAgoraAnalytics = payload => {
    dispatch(updateAgoraAnalytics(payload));
  };

  return {
    removeUser: kickoutUser,
    stopRecording: stopPLRecording,
    rejectStageJoinReq,
    acceptStageJoinReq,
    handleAnalytics,
    saveAgoraAnalytics,
  };
}
