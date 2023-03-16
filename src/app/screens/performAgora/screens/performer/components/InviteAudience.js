import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useQuery } from 'react-query';
import '../../../../../styles/performerview/invite-audience.scss';
import { IMG } from '../performer.dependencies';
import {
  setActiveInvitedAudience,
  setActiveStageUser,
  setInviteAudience,
} from '../state/performer.actions';
import { firebaseClient } from '../../../../../utils/firebase';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import Button from '../../../../../components/Common/Button/Button';
import Block from '../../../../../components/Block/Block';
import useApi from '../../../../../hooks/api';
// import AudiencePhoto from '../../assets/image/audience-photo.png';

const values = ['Report user', 'Block user'];

export default function InviteAudience({ user }) {
  const dispatch = useDispatch();
  const [openOtherDialog, setOpenOtherDialog] = React.useState(false);
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const removeFromPerformance = user => {
    const data = {
      state: 'remove',
      userDetials: {
        ...user,
      },
    };
    dispatch(setInviteAudience(data));
  };

  const cancelInviteStageRequest = () => {
    const data = {
      state: '',
      userDetials: {
        ...user,
      },
    };
    dispatch(setInviteAudience(data));
  };

  const inviteStageRequest = user => {
    const data = {
      state: '',
      userDetials: {
        ...user,
      },
    };
    dispatch(setInviteAudience(data));
    const messageData = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.INVITE_AUDIENCE_TO_STAGE,
      senderId: performanceData.performer.id,
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.sendPeerMessage(user.id, messageData);
    // save the user's data who is going to join the stage
    dispatch(
      setActiveStageUser({
        active: true,
        data: user,
      }),
    );

    // save the invited user info in redux
    dispatch(setActiveInvitedAudience(user));
  };

  const {
    getPerformerPublicId,
    getPerformerPublicIdFollowersCount,
    getPerformerPublicIdFollowsCount,
    getPerformerPublicIdPerformancesCount,
  } = useApi('performer');

  const id = user.performerId;
  const { data: perfomer = {} } = useQuery(['performer', id], () =>
    getPerformerPublicId(id),
  );
  const { data: performerFollowersCount = { count: 0 } } = useQuery(
    ['performerFollowersCount', id],
    () => getPerformerPublicIdFollowersCount(id),
  );
  const { data: performerFollowsCount = { count: 0 } } = useQuery(
    ['performerFollowsCount', id],
    () => getPerformerPublicIdFollowsCount(id),
  );
  const { data: performerPerformancesCount = { count: 0 } } = useQuery(
    ['performerPerformancesCount', id],
    () => getPerformerPublicIdPerformancesCount(id),
  );

  console.log('user in inviteAudience: ', user);
  return (
    <div className="invite-audience">
      <div className="modal-bg" />
      <div className={`audience-photo ${openOtherDialog && 'openOtherDialog'}`}>
        <img src={user.profileImageUrl || IMG.USER} alt="audience" />
      </div>
      <div className="invite-modal">
        <h2>{user.displayName}</h2>
        {perfomer.description && (
          <p className="invite-description">{perfomer.description}</p>
        )}
        <div className="close-audience">
          <img
            src={IMG.MODAL_CLOSE}
            className="close-icon-audience"
            alt="close icon"
            onClick={() => cancelInviteStageRequest(user)}
            role="none"
          />
        </div>
        <div className="block-icon">
          <Block
            userInfo={user}
            direction="left"
            values={values}
            handleOpenDialog={() => {
              setOpenOtherDialog(true);
            }}
            handleCloseDialog={() => {
              setOpenOtherDialog(false);
            }}
          />
        </div>
        <div className="audience-details">
          <div>
            <span>Followers</span>
            <h4>{performerFollowersCount.count}</h4>
          </div>
          <div className="border" />
          <div>
            <span>Following</span>
            <h4>{performerFollowsCount.count}</h4>
          </div>
          <div className="border" />
          <div>
            <span>Shows</span>
            <h4>{performerPerformancesCount.count}</h4>
          </div>
        </div>
        <div className="invite-action">
          <Button
            className="action-btn"
            type="primary"
            size="large"
            background="transparent"
            border="gradient"
            onClick={() => cancelInviteStageRequest(user)}
          >
            {'Remove'}
          </Button>
          <Button
            className="action-btn"
            type="primary"
            size="large"
            background="gradient"
            onClick={() => inviteStageRequest(user)}
          >
            {'Invite to stage'}
          </Button>
        </div>
      </div>
    </div>
  );
}
