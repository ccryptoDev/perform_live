import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../../styles/performerview/invite-audience.scss';
import moment from 'moment';
import { firebaseClient } from '../../../../../utils/firebase';
import {
  setInviteStageStatus,
  setJoinStageStatus,
} from '../state/audience.actions';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import { firebaseUtils } from '../../../../../utils/firebaseUtils';
import Button from '../../../../../components/Common/Button/Button';

export default function InviteStageResponse(props) {
  const dispatch = useDispatch();
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const handleDecline = () => {
    dispatch(
      setInviteStageStatus({
        status: '',
      }),
    );

    updateResponse(
      PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.INVITE_REJECTED_FOR_STAGE,
    );
  };

  const handleAcceptRequest = async () => {
    dispatch(
      setInviteStageStatus({
        status: '',
      }),
    );
    dispatch(setJoinStageStatus({ status: 'joined' }));
    await firebaseUtils.handleStageUser(props.userInfo, 'add');
    updateResponse(
      PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.INVITE_ACCEPTED_FOR_STAGE,
    );
    // publish stream
    const client = window.perform.getBordCastRTCClient();
    client.createLocalStream(
      {
        attendeeMode: 'video',
        videoProfile: '480p_1',
      },
      () => {
        client.publishStream();
      },
    );
  };

  const updateResponse = msgType => {
    const messageData = {
      messageType: msgType,
      senderId: props.userInfo.userId,
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.sendPeerMessage(performanceData.performer.id, messageData);
  };

  return (
    <div className="invite-audience">
      <div className="invite-modal">
        <h2 className="h2">Invitation for stage!</h2>
        <p>Performer want to get you on stage!</p>
        <div className="invite-action">
          <Button
            size="large"
            background="transparent"
            border="gradient"
            onClick={handleDecline}
          >
            DECLINE
          </Button>
          <Button size="large" onClick={handleAcceptRequest}>
            ACCEPT
          </Button>
        </div>
      </div>
    </div>
  );
}
