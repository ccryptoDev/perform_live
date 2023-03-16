import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _get from 'lodash/get';
import '../../../../../styles/greenroom.scss';
import { IMG } from '../performer.dependencies';
import { checkToAllowCameraPermission } from '../../../../../utils/perform';
import {
  updateToAllowDeviceStatus,
  updateCurrentSettingComponent,
  allowedForLive,
} from '../state/performer.actions';
import { usePerformanceProducts } from '../../../../../hooks/usePerformanceProducts.query';
import CameraIcon from '../../../../../../assets/svg/green-room/camera.svg';
import MicroIcon from '../../../../../../assets/svg/green-room/micro.svg';
import LabelIcon from '../../../../../../assets/svg/green-room/label.svg';
import Button from '../../../../../components/Common/Button';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
import useNetworkQuality from '../../../../../hooks/useNetworkQuality';

// import ICON_INFO from '../../assets/svg/green-room/iconinfo.svg';
// import CHECKOUT from '../../assets/svg/green-room/checkout.svg';
// import RIGHT_ICON from '../../assets/svg/green-room/right.svg';
// import RIGHT_ARROW from '../../assets/svg/plan/right.svg';

const RoomLists = ({ itemInfo }) => {
  const dispatch = useDispatch();
  // const data = useSelector(state => state.performer);

  const handleComponent = () => {
    let component = '';
    if (itemInfo.id == 1) {
      component = 'internet';
    }
    if (itemInfo.id == 2) {
      component = 'camera';
    }
    if (itemInfo.id == 3) {
      component = 'microphone';
    }
    if (itemInfo.id == 4) {
      component = 'productList';
    }

    dispatch(updateCurrentSettingComponent({ component }));
  };
  return (
    <>
      <div className="border-line" />
      <div className="room">
        <div className="start">
          <img src={itemInfo.icon} className="icon" alt="icon lists" />
          <div className="description">
            <div className="text">{itemInfo.text}</div>
            <div className="action">{itemInfo.action}</div>
          </div>
        </div>
        <div className="room__action-btns">
          <img
            src={itemInfo.allowed ? IMG.CHECKOUT : IMG.RED_CROSS}
            className="checkout-circle"
            alt="checkout"
          />
          <img
            src={IMG.RIGHT_ICON}
            className="right-icon"
            alt="right icon"
            onClick={() => handleComponent()}
          />
        </div>
      </div>
    </>
  );
};

const GreenRoom = ({ isModal, onFinishSetting, performanceData }) => {
  const dispatch = useDispatch();
  const devicesAllowed = useSelector(state => state.performer.deviceStatus);
  const { performanceProducts } = usePerformanceProducts(performanceData.id);

  useEffect(
    () => {
      checkToAllowCameraPermission()
        .then(data => {
          dispatch(updateToAllowDeviceStatus({ status: true }));
        })
        .catch(error => {
          if (error.type && error.status === false) {
            dispatch(updateToAllowDeviceStatus({ status: false }));
          }
        });
    },
    [isModal],
  );

  const { isConnectionStrong } = useNetworkQuality();

  const goToPerformance = () => {
    if (devicesAllowed) {
      const { testStream } = window.perform.getBordCastRTCClient();
      if (testStream) {
        testStream.stop();
        testStream.close();
      }
      onFinishSetting();
      // dispatch(allowedForLive({ allowedForLive: true }));
    }
  };

  const items = [
    {
      id: 1,
      text: 'Internet connection',
      allowed: isConnectionStrong,
      action: isConnectionStrong ? 'Strong signal' : 'Poor signal',
      icon: IMG.ICON_INFO,
    },
    {
      id: 2,
      text: 'Camera',
      allowed: devicesAllowed,
      action: devicesAllowed ? 'Connected' : 'Allow camera access',
      icon: CameraIcon,
    },
    {
      id: 3,
      text: 'Microphone',
      allowed: devicesAllowed,
      action: devicesAllowed ? 'Connected' : 'Allow microphone access',
      icon: MicroIcon,
    },
    {
      id: 4,
      text: 'Products',
      allowed: performanceProducts.length,
      action: `${performanceProducts.length} products`,
      icon: LabelIcon,
    },
    // {
    //   id: 5,
    //   text: 'Getting to stage',
    //   action: 'Allowed with the price of $8',
    // },
    // {
    //   id: 6,
    //   text: 'AR effects',
    //   action: 'Background, face light',
    // },
  ];
  return (
    <>
      <div className={isModal ? 'green-room active' : 'green-room'}>
        <div className="green-layout">
          <div className="card">
            <div className="card-header">
              <div className="title">Green room</div>
              <Button
                size="default"
                background="glassy-white"
                className="circle-btn"
                onClick={() => goToPerformance()}
                suffix={<img src={CloseIcon} alt="close icon" />}
              />
              <div className="check-connection">
                Check if everything is ready for
              </div>
              <div className="euqipment-text">2021 Quadrocopters Equipment</div>
            </div>
            <div className="room-body">
              {items.map(item => (
                <RoomLists itemInfo={item} key={item.id} />
              ))}
              <div className="border-line" />
            </div>
            <div className="card-bottom">
              <button
                className="performance-btn"
                onClick={() => goToPerformance()}
              >
                GO TO PERFORMANCE
              </button>
              <img
                src={IMG.PLAN_NEXT_ARROW}
                className="right-arrow"
                alt="right arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreenRoom;
