import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { IMG } from '../../profile.dependencies';
import Button from '../../../../components/Common/Button/Button';
import AppConstants from 'app/app.constants.json';

import {
  checkAMPM,
  convertTo12HrFormat,
  getShortMonthName,
} from '../../../../utils/timeConverter';
import { getUserName } from '../../../../utils/getUserName';

const Card = ({ 
  performance, 
  deletePerformance, 
  userInfo,
  onShare, 
}) => {
  const history = useHistory();
  const redirectEditPage = React.useCallback(() => {
    history.push(`/performance/edit/${performance.id}`);
  }, []);

  const redirectLivePage = React.useCallback(() => {
    history.push(`/performlive/${performance.id}/performer/${userInfo.id}`);
  }, []);
  return (
    <div className="card flex-column">
      <div className="card-body">
        {performance.coverUrl && <img src={performance.coverUrl} />}
        <div className="card-top flex-row-space">
          {performance.stagePrice !== null && (
            <span>
              {performance.stagePrice > 0
                ? `$${performance.stagePrice}`
                : 'FREE'}
            </span>
          )}
          {(performance.state === AppConstants.PERFORMANCE_STATUS.LIVE ||
            performance.state ===
              AppConstants.PERFORMANCE_STATUS.PUBLISHED) && (
            <div >
              {/* <img src={IMG.PROFILE_DIS}/> */}
              <img src={IMG.PROFILE_SHARE} onClick={() => {
                onShare(performance, userInfo);
              }}/>
            </div>
          )}
          {performance.state === AppConstants.PERFORMANCE_STATUS.DRAFT && (
            <div>
              <img
                src={IMG.PROFILE_DELETE}
                className="delete-ico"
                onClick={() => {
                  deletePerformance(performance.id);
                }}
              />
            </div>
          )}
          {performance.state === AppConstants.PERFORMANCE_STATUS.PAST && (
            <div>
              <img src={IMG.PROFILE_SHARE} onClick={() => {
                onShare(performance, userInfo);
              }} />
            </div>
          )}
        </div>
        <div className="card-bottom flex-row">
          <img
            src={userInfo.imageUrl ? userInfo.imageUrl : IMG.USER_BLANK_AVATAR}
            className={`user-avatar ${!userInfo.imageUrl && 'blank'}`}
          />
          <span>{getUserName(userInfo)}</span>
        </div>
        {performance.state === AppConstants.PERFORMANCE_STATUS.DRAFT && (
          <Button onClick={() => redirectEditPage()}>Continue</Button>
        )}
      </div>
      {performance.startDatetime !== null && (
        <div className="date-time flex-row-space mt-8">
          <span>
            {getShortMonthName(
              moment(performance.startDatetime).format('M') - 1,
            )}
            , {moment(performance.startDatetime).format('DD')}
          </span>
          <span>
            {convertTo12HrFormat(
              moment(performance.startDatetime).format('HH:mm'),
            )}{' '}
            -{' '}
            {convertTo12HrFormat(
              moment(performance.endDatetime).format('HH:mm'),
            )}{' '}
            <small className="set-time">
              {checkAMPM(moment(performance.endDatetime).format('HH:mm'))}
            </small>
          </span>
        </div>
      )}
      {(performance.state === 'live' || performance.state === 'published') && (
        <Button onClick={() => redirectLivePage()}>Go Live</Button>
      )}
      {performance.name !== null ? (
        <div className="card-title mt-8">{performance.name}</div>
      ) : (
        <div className="card-no-title mt-8">No name</div>
      )}
    </div>
  );
};

export default Card;
