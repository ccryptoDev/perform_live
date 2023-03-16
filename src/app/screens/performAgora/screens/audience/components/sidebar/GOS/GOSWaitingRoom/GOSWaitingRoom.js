import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import CircularSpinner from '../../../../../../../../components/CircularSpinner';
import Button from '../../../../../../../../components/Common/Button';
import { firebaseUtils } from '../../../../../../../../utils/firebaseUtils';
import {
  setJoinStageStatus,
  setSidebarView,
} from '../../../../state/audience.actions';

const GOSWaitingRoom = ({ userInfo, performanceData }) => {
  const dispatch = useDispatch();
  const joinStatus = useSelector(state => state.audience.joinStage.status);
  const handleCancel = () => {
    if (joinStatus === 'joinRequested') {
      const performerId = _get(performanceData.performer, 'id', null);
      firebaseUtils.cancelRequestToJoinStage(performerId, userInfo);
    }

    dispatch(setJoinStageStatus({ status: '' }));
    dispatch(setSidebarView('main'));
  };

  return (
    <div className="gos-waiting-room">
      <div className="gos-waiting-room__spinner-wrapper">
        <CircularSpinner error={joinStatus === 'rejected'} />
        <div className="f-body-15 gos-waiting-room__text">
          {joinStatus !== 'rejected'
            ? 'Your request is being reviewed'
            : `Unfortunately, your request to join the stage with ${
                performanceData.performer.stageName
              } could not be granted. Don’t worry! You will not be charged!`}
        </div>
      </div>
      <Button onClick={handleCancel}>
        {joinStatus !== 'rejected' ? 'CANCEL REQUEST' : 'BACK TO PERFORMANCE'}
      </Button>
    </div>
  );
};

GOSWaitingRoom.propTypes = {};

export default GOSWaitingRoom;
