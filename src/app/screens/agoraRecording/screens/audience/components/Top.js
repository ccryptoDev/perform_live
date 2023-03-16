import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from 'lodash';

import '../../../../../styles/content.scss';
import { getServerCurrentTime } from '../../../../../state/app.actions';
import { getFullName } from '../../../../../utils/common';
import { IMG } from '../../../../profile/profile.dependencies';

const Top = ({ expandSidebar }) => {
  const dispatch = useDispatch();

  const performanceData = useSelector(
    state => state.agorarecording.performanceData,
  );

  useEffect(() => {
    dispatch(getServerCurrentTime());
  }, []);

  const fullName =
    get(performanceData.performer, 'stageName', null) ||
    getFullName(
      performanceData.performer.firstName,
      performanceData.performer.lastName,
    );

  return (
    <>
      <div className={expandSidebar ? 'perform-top active' : 'perform-top'}>
        <div className="live-detail active">
          <div className="live-avatar">
            <img
              className="live-pic"
              src={performanceData.performer.imageUrl || IMG.USER}
              alt="live avatar"
            />
            <button className="live-status" type="button">
              {performanceData.state.toUpperCase()}
            </button>
          </div>
          <div className="live-info">
            <div className="review">{performanceData.name}</div>
            <div className="live-name">
              <span className="live-name-info">{fullName}</span>
              {/* {open ? <ShowProfile /> : null} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;
