import moment from 'moment';
import { PerformAgoraConstants } from '../screens/performAgora/performAgora.constants';
import { firebaseClient } from './firebase';
const { FIREBASE_MESSAGE_TYPES } = PerformAgoraConstants;
import IMG from 'app/utils/images';
import { getFullName } from './common';

class FirebaseUtils {
  getDataOnce(channelRef) {
    return new Promise((resolve, reject) => {
      firebaseClient.getDataOnce(channelRef, data => {
        resolve(data);
      });
    });
  }

  getChannelUserInfo = async performerId => {
    const channelRef = `channel_users/${
      window.perform.eventChannelName
    }/${performerId}`;
    const data = await this.getDataOnce(channelRef);
    return data;
  };

  getChannelActiveUsers = async () => {
    const channelRef = `channel_users/${window.perform.eventChannelName}`;
    const data = await this.getDataOnce(channelRef);
    const audienceList = [];
    if (data.value) {
      Object.keys(data.value).map(key => {
        if (
          data.value[key].isCurrentlyWatching &&
          !data.value[key].isUserBlockedFromPerformance
        ) {
          audienceList.push(data.value[key]);
        }
      });
    }
    return audienceList;
  };

  getChannelUsers = async () => {
    const channelRef = `channel_users/${window.perform.eventChannelName}`;
    const data = await this.getDataOnce(channelRef);
    return data.value;
  };

  checkAllowedToJoin = async (performerId, callback) => {
    // check if the user was already part of this performance and whether blocked by performer or not
    const performerDataExist = await this.getChannelUserInfo(performerId);
    if (
      performerDataExist.value &&
      performerDataExist.value.isUserBlockedFromPerformance
    ) {
      callback(false);
    }
    const audienceList = await this.getChannelActiveUsers();
    let allowed = true;
    if (audienceList.length >= 50) {
      allowed = false;
    }
    callback(allowed);
  };

  // Either add or remove from channel_state/stage_users
  handleStageUser = async (stageUser, action) => {
    const channelStateRef = `channel_state/${
      firebaseClient._channel
    }/stage_users`;
    const data = await this.getDataOnce(channelStateRef);
    const stageUsers = (data.value && [...data.value]) || [];
    // check if this already exist or not
    const isExistIndex = stageUsers.findIndex(
      user => user.id === stageUser.userId,
    );
    if (isExistIndex === -1 && action === 'add') {
      stageUsers.push({
        id: stageUser.userId,
        timeStamp: moment()
          .utc()
          .format(),
      });
    } else if (isExistIndex !== -1 && action === 'remove') {
      stageUsers.splice(isExistIndex, 1);
    }
    await firebaseClient.setData(channelStateRef, stageUsers);
  };

  joinStage = (performerId, stageUser) => {
    const data = {
      messageType: FIREBASE_MESSAGE_TYPES.REQUEST_TO_JOIN_STAGE,
      ...this.prepareMessage(stageUser),
    };

    firebaseClient.sendPeerMessage(performerId, data);
  };

  cancelRequestToJoinStage = (performerId, stageUser) => {
    const data = {
      messageType: FIREBASE_MESSAGE_TYPES.CANCEL_REQUEST_TO_JOIN_STAGE,
      ...this.prepareMessage(stageUser),
    };
    firebaseClient.sendPeerMessage(performerId, data);
  };

  prepareMessage = stageUser => {
    return {
      timeStamp: moment()
        .utc()
        .format(),
      requester: {
        displayName: getFullName(stageUser.firstName, stageUser.lastName),
        id: stageUser.userId,
        profileImageUrl: stageUser.imageUrl || IMG.USER,
      },
    };
  };
}

export const firebaseUtils = new FirebaseUtils();
