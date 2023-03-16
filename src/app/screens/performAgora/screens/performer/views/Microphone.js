import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../../styles/microphone.scss';
import { IMG } from '../performer.dependencies';
import {
  updateToAllowDeviceStatus,
  updateCurrentSettingComponent,
} from '../state/performer.actions';
import Button from '../../../../../components/Common/Button';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
import MicrophoneIcon from '../../../../../../assets/svg/green-room/micro-dots.svg';
// import HOME_BACK_GREEN from '../../assets/svg/home/back-green.svg';
// import HOME_CHECK_GREEN from '../../assets/svg/home/check-green.svg';
// import MICROPHONE_ICON from '../../assets/svg/home/microphone-icon.svg';
// import MICROPHONE_FIELD from '../../assets/image/home/microphone.png';

const Microphone = ({ isModal }) => {
  const dispatch = useDispatch();
  const [microphoneState, setMicrophoneState] = useState(false);
  const { audioDevices } = (window.perform &&
    window.perform.getRTCDevices()) || { audioDevices: [] };
  const [microphoneId, setMicrophone] = useState(
    audioDevices.length && audioDevices[0].deviceId,
  );
  // const { mainStream } = window.perform.getBordCastRTCClient();
  const performerState = useSelector(state => state.performer);
  const [devices, setDevices] = useState([]);
  const handleComponents = () => {
    const component = 'greenroom';
    dispatch(updateCurrentSettingComponent({ component }));
  };
  const handleChange = event => {
    setMicrophone(event.target.value);
  };
  useEffect(() => {
    if (window.perform) {
      setDevices(window.perform.getRTCDevices().audioDevices);
    }
  }, []);
  useEffect(
    () => {
      if (isModal) {
        if (performerState.deviceStatus) {
          setMicrophoneState(true);
        }
      }
      return () => {
        if (!window.perform) {
        }
      };
    },
    [isModal, performerState],
  );
  return (
    <>
      <div className={isModal ? 'microphone active' : 'microphone'}>
        <div className="check-layout">
          <div className="card">
            <div className="close" onClick={() => handleComponents()}>
              <img className="back" src={IMG.HOME_BACK_GREEN} alt="back icon" />
              <Button
                size="default"
                background="glassy-white"
                className="circle-btn"
                onClick={() => handleComponents()}
                suffix={<img src={CloseIcon} alt="close icon" />}
              />
            </div>
            <div className="card-header">
              <div className="title">Microphone</div>
            </div>
            <div className="check-body">
              <img
                src={microphoneState ? IMG.HOME_CHECK_GREEN : IMG.RED_CROSS}
                className="check-icon"
                alt="check internet"
              />
              <div className="test-text">
                <span className="your">
                  {microphoneState
                    ? 'your'
                    : 'you do not have any microphone connected'}
                </span>
                {/* <img
                  src={IMG.MICROPHONE_ICON}
                  className="microphone-icon"
                  alt="face time"
                /> */}
                {microphoneState && (
                  <select
                    className="microphone-select"
                    value={microphoneId}
                    onChange={handleChange}
                  >
                    {devices.map(device => (
                      <option value={device.deviceId} key={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </select>
                )}
                <span className="connect">
                  {microphoneState && ' is connected'}
                </span>
              </div>
              <div className="camera-field">
                <img
                  src={MicrophoneIcon}
                  className="camera-img"
                  alt="camera field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Microphone;
