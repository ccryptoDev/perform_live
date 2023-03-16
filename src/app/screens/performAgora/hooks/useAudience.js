import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { firebaseClient } from '../../../utils/firebase';
import { setPerformancePresence } from '../screens/audience/state/audience.actions';

export default function useAudience() {
  const userInfo = useSelector(state => state.global.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const leftPerformance = (redirect = true) => {
    updateLeaveStateFB();
    const client = window.perform.getBordCastRTCClient();
    // client.unpublishStream();
    client.leaveChannel();
    setTimeout(() => {
      if (redirect) {
        dispatch(
          setPerformancePresence({
            state: 'removed',
          }),
        );
        return history.replace('/', {
          popup: 'Performance completed.\nThanks for watching!',
        });
      }
    }, 500);
  };

  const updateLeaveStateFB = (
    isCurrentlyWatching=false, 
    isUserBlockedFromPerformance=false 
  ) => {
    // Update user state in channel_users table
    console.log('here');
    const channelUsersRef = `channel_users/${firebaseClient._channel}/${
      userInfo.userId
    }`;
    const messagedata = {
      isCurrentlyWatching: isCurrentlyWatching,
      isUserBlockedFromPerformance: isUserBlockedFromPerformance,
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.updateData(channelUsersRef, messagedata);
  };

  return {
    leftPerformance,
    updateLeaveStateFB,
  };
}
