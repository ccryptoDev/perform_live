import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../../../../styles/interconnect.scss';
import { IMG } from '../performer.dependencies';
import {
  updateToAllowDeviceStatus,
  updateCurrentSettingComponent,
} from '../state/performer.actions';
import Button from '../../../../../components/Common/Button';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
import useNetworkQuality from '../../../../../hooks/useNetworkQuality';

const Interconnect = ({ isModal }) => {
  const dispatch = useDispatch();
  const { isConnectionStrong } = useNetworkQuality();

  const handleComponents = () => {
    const component = 'greenroom';
    dispatch(updateCurrentSettingComponent({ component }));
  };

  return (
    <>
      <div className={isModal ? 'inter-check active' : 'inter-check'}>
        <div className="check-layout">
          <div className="card">
            <div className="close" onClick={() => handleComponents()}>
              <img className="back" src={IMG.HOME_BACK_GREEN} alt="back icon" />
              <Button
                size="default"
                background="glassy-white"
                className="circle-btn"
                onClick={() => !isModal}
                suffix={<img src={CloseIcon} alt="close icon" />}
              />
            </div>
            <div className="card-header">
              <div className="title">Internet Connection</div>
            </div>
            <div className="check-body">
              <img
                src={isConnectionStrong ? IMG.HOME_CHECK_GREEN : IMG.RED_CROSS}
                className="check-icon"
                alt="check internet"
              />
              {/* <div className="test">
                <img src={connection} className="connection" alt="connection icon"/>
                <div className="text">Connection: <span>Poor</span></div>
              </div> */}
              <div className="test-text">
                Your internet signal is {!isConnectionStrong && 'not '}
                good enough for streaming
              </div>
              {!isConnectionStrong && (
                <div className="connect">
                  Check your internet settings or try to connect to another
                  internet spot.
                </div>
              )}
            </div>
            {/* <div className="btns-group"> */}
            {/* <button className="start">Open Settings</button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interconnect;
