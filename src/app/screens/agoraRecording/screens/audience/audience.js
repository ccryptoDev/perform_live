import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import AppConstants from 'app/app.constants.json';

import SideBar from './components/SideBar';
import Content from './components/Content';

import './audience.scss';

export const Audience = ({ performanceData = null, userInfo = {} }) => {
  const history = useHistory();

  // Join audience in performance channel
  // update audience join state in application
  // add user to firebase in channel_users table
  useEffect(
    () => {
      if (performanceData) {
        handleAudienceJoin(true);
      }
    },
    [performanceData.state],
  );

  const handleAudienceJoin = allowJoin => {
    if (allowJoin) {
      // check if performance is in live mode then allow audience to join the channel else only allow to join Firebase
      if (
        performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE &&
        window.perform
      ) {
        window.perform.joinHostEvent('attendee', [], data => {});
      }
    } else {
      // history.push('/');
    }
  };

  // When user leave performance, reset all his data from store
  useEffect(
    () => () => {
      // remove all agora services by which the audience was connected
      if (window.perform) {
        window.perform.leaveRTC();
      }
      window.perform = null;
    },
    [],
  );

  return (
    <>
      <div className="content-wrapper">
        <Content />
        <SideBar />
      </div>
    </>
  );
};

Audience.propTypes = {
  performanceData: PropTypes.object,
  userInfo: PropTypes.object,
};

export default Audience;
