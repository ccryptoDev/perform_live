import React, { useRef, useEffect, useState } from 'react';
import { IMG } from '../../screens/audience/audience.dependencies';

const FullScreen = ({ handleClick, elemId = 'content-body' }) => {
  const [screenMode, setScreenMode] = useState('exit');

  // registering full screen change event listener
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleESCKyePress);

    return () => {
      document.removeEventListener('fullscreenchange', handleESCKyePress);
    };
  }, []);
  const onFullScreenClick = action => {
    if (handleClick) {
      handleClick(action);
    }
    if (action === 'enter') {
      goToFullScreenMode();
    } else {
      ExitFullScreenMode();
    }
  };

  const goToFullScreenMode = () => {
    const elem =
      (elemId && document.getElementById(elemId)) || document.documentElement;
    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ExitFullScreenMode = () => {
    try {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleESCKyePress = () => {
    setScreenMode(prevState => (prevState === 'enter' ? 'exit' : 'enter'));
  };

  return (
    <div
      className="full-screen"
      onClick={() =>
        onFullScreenClick(screenMode === 'enter' ? 'exit' : 'enter')
      }
      onKeyPress={() =>
        onFullScreenClick(screenMode === 'enter' ? 'exit' : 'enter')
      }
      role="button"
      tabIndex={0}
    >
      <img
        className="full-screen-icon"
        src={IMG.FULL_SCREEN}
        alt="full screen icon"
      />
    </div>
  );
};

export default React.memo(FullScreen);
