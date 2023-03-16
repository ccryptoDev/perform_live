import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { firebaseClient } from '../../../../../utils/firebase';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import { IMG } from '../audience.dependencies';
import { setStagePresence } from '../state/audience.actions';
import { getFullName } from '../../../../../utils/common';
import { firebaseUtils } from '../../../../../utils/firebaseUtils';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
import Button from '../../../../../components/Common/Button';

function LeftModal() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.global.userInfo);

  const setRemoveModal = flag => {
    if (flag) {
      if (window.perform) {
        const client = window.perform.getBordCastRTCClient();
        client.unpublishStream();
      }

      // trigger firebase event
      const data = {
        messageType:
          PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.AUDIENCE_LEFT_STAGE,
        timeStamp: moment()
          .utc()
          .format(),
        user: {
          displayName: getFullName(userInfo.firstName, userInfo.lastName),
          // profileImageUrl: IMG.USER,
          id: userInfo.userId,
        },
      };
      firebaseClient.sendChannelMessage('', data);
      // remove user from firebase channelState Table
      firebaseUtils.handleStageUser(userInfo, 'remove');
    }
    const data = {
      state: '',
    };
    dispatch(setStagePresence(data));
  };
  return (
    <>
      <div className="leave-stage-modal">
        <div className="modal-body">
          <div className="modal__top">
            <div className="title">
              Thanks for going Live with your Performer!
            </div>
            <Button
              size="default"
              background="glassy-white"
              className="circle-btn"
              onClick={() => setRemoveModal(true)}
              suffix={<img src={CloseIcon} alt="close icon" />}
            />
          </div>
          <div className="description">
            Keep supporting your Performer – share this channel with your
            friends!
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftModal;
