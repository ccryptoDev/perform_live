import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../../../../styles/camera.scss';
import { IMG } from '../performer.dependencies';
import {
  updateToAllowDeviceStatus,
  updateCurrentSettingComponent,
} from '../state/performer.actions';
import Button from '../../../../../components/Common/Button';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
// import BACK_GREEN from '../../assets/svg/home/back-green.svg';
// import checkin from '../../assets/svg/home/check-green.svg';
// import FACE_TIME from '../../assets/svg/home/face-time.svg';
// import CAMERA from '../../assets/image/home/camera.png';

const Camera = ({ isModal }) => {
  const { testStream } = window.perform
    ? window.perform.getBordCastRTCClient()
    : '';
  const [cameraState, setCameraState] = useState(false);
  const { videoDevices } = (window.perform &&
    window.perform.getRTCDevices()) || { videoDevices: [] };
  const [cameraId, setCamera] = useState(
    (videoDevices.length && videoDevices[0].deviceId) || 0,
  );
  const [devices, setDevices] = useState([]);
  const dispatch = useDispatch();
  const handleComponents = () => {
    const component = 'greenroom';
    if (testStream) {
      testStream.stop();
      testStream.close();
    }
    dispatch(updateCurrentSettingComponent({ component }));
  };
  const handleChange = event => {
    setCamera(event.target.value);
  };
  useEffect(
    () => {
      registerCallbacks();
      if (window.perform && isModal) {
        setDevices(window.perform.getRTCDevices().videoDevices);
        const client = window.perform.getBordCastRTCClient([]);
        client.createStream({
          attendeeMode: 'video',
          videoProfile: '480p_1',
        });
      }

      return () => {
        unregisterCallbacks();
      };
    },
    [isModal],
  );

  const registerCallbacks = () => {
    if (window.perform) {
      window.perform.on('test-stream-created', handleTestStream);
    }
  };

  const unregisterCallbacks = () => {
    if (window.perform) {
      window.perform.off('test-stream-created', handleTestStream);
    }
  };

  const handleTestStream = data => {
    const { testStream } = window.perform.getBordCastRTCClient();
    if (testStream) {
      setCameraState(true);
      if (!testStream.isPlaying()) {
        window.perform.playStream(testStream, `camera-section`, false);
      }
    } else {
      setCameraState(false);
    }
  };

  return (
    <>
      <div className={isModal ? 'camera active' : 'camera'}>
        <div className="check-layout">
          <div className="modal-bg" />
          <div className="card">
            <div className="close" onClick={() => handleComponents()}>
              <img className="back" src={IMG.HOME_BACK_GREEN} alt="back icon" />
            </div>
            <Button
              size="default"
              background="glassy-white"
              className="circle-btn"
              onClick={() => handleComponents()}
              suffix={<img src={CloseIcon} alt="close icon" />}
            />
            <div className="card-header">
              <div className="title">Camera</div>
            </div>
            <div className="check-body">
              <img
                src={cameraState ? IMG.HOME_CHECK_GREEN : IMG.RED_CROSS}
                className="check-icon"
                alt="check internet"
              />
              <div className="test-text">
                <span className="your">
                  {cameraState
                    ? 'your '
                    : 'you do not have any cameras connected'}
                </span>
                {/* <img
                  src={IMG.FACE_TIME}
                  className="face-time"
                  alt="face time"
                /> */}
                {cameraState && (
                  <select
                    className="camera-option"
                    value={cameraId}
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
                  {cameraState && ' is connected'}
                </span>
              </div>
              <div className="camera-field" id="camera-section">
                {!testStream && (
                  <img
                    src={IMG.CAMERA}
                    className="camera-img"
                    alt="camera field"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Camera);
