import React, { memo, useMemo } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Button from '../../../../../../../../components/Common/Button';
import { getFullName } from '../../../../../../../../utils/common';

const GOSRow = ({
  performanceData,
  joinStage,
  joinStageStatus,
  leaveStage,
  allowedToJoinStage,
}) => {
  const { stagePurchase } = performanceData;
  const timeOnStage = moment(performanceData.endDatetime).diff(
    moment(),
    'minutes',
  );
  const price = stagePurchase && stagePurchase.price;

  return (
    <div className="stage-field">
      <div className="stage-text">
        {/* <span>
          {`${getFullName(
            performanceData.performer.firstName,
            performanceData.performer.lastName,
          )}`}{' '}
          on stage for{' '}
        </span>
        <span className="stage-time">{timeOnStage} mins</span>
        <span>, during this time you can ask him anything!</span> */}
        You can join Performer Live On Stage now!
        <span className="text">
          {price ? ` For only $${price}` : ` It's Free`}
        </span>
      </div>

      <div className="stage-button">
        {joinStageStatus.status !== 'joined' && (
          <Button
            className="join-btn"
            onClick={joinStage}
            type="button"
            size="medium"
            fontSize="10px"
            disabled={
              joinStageStatus.status === 'joinRequested' || !allowedToJoinStage
            }
          >
            join stage
          </Button>
        )}
        {joinStageStatus.status === 'joined' && (
          <Button
            className="join-btn leave-btn"
            onClick={leaveStage}
            size="large"
            fontSize="10px"
          >
            Leave stage
          </Button>
        )}
      </div>
    </div>
  );
};

GOSRow.propTypes = {};

export default memo(GOSRow);
