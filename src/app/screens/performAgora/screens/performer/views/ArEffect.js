import React from 'react';
import Slider from 'react-input-slider';
import Effect from '../components/Effect';
import '../../../../../styles/areffect.scss';
import { IMG } from '../performer.dependencies';

// import back from '../../assets/svg/home/back-green.svg';
// import checkin from '../../assets/svg/home/check-green.svg';
// import filtersicon from '../../assets/svg/plan/AR/filters.svg';
// import rightarrow from '../../assets/svg/plan/AR/right-arrow.svg';
// import facial from '../../assets/svg/plan/AR/facial.svg';
// import arback from '../../assets/svg/plan/AR/ar-back.svg';
// import camerafield from '../../assets/image/home/camera.png';

const Filters = () => {
  const items = [
    {
      id: 1,
      src: 'normal',
      title: 'Normal',
      slide: 10,
    },
    {
      id: 2,
      src: 'vivid',
      title: 'Vivid',
      slide: 20,
    },
    {
      id: 3,
      src: 'intense',
      title: 'Intense',
      slide: 30,
    },
    {
      id: 4,
      src: 'vividcool',
      title: 'Vivid Cool',
      slide: 40,
    },
    {
      id: 5,
      src: 'vividwarm',
      title: 'Vivid Warm',
      slide: 50,
    },
    {
      id: 6,
      src: 'intensecool',
      title: 'Intense Cool',
      slide: 60,
    },
    {
      id: 7,
      src: 'intensewarm',
      title: 'Intense Warm',
      slide: 70,
    },
    {
      id: 8,
      src: 'mono',
      title: 'Mono',
      slide: 80,
    },
    {
      id: 9,
      src: 'silvertone',
      title: 'Silvertone',
      slide: 90,
    },
    {
      id: 10,
      src: 'noir',
      title: 'Noir',
      slide: 100,
    },
  ];
  return (
    <>
      <div className="items">
        {items.map(item => (
          <Effect effectInfo={item} />
        ))}
      </div>
      <img
        src={IMG.RIGHT_ARROW_ICON}
        className="right-arrow"
        alt="right arrow"
      />
    </>
  );
};

const Facial = () => {
  const items = [
    {
      id: 1,
      src: 'normal',
      title: 'Normal',
      slide: 20,
    },
    {
      id: 2,
      src: 'vivid',
      title: 'Vivid',
      slide: 40,
    },
    {
      id: 3,
      src: 'intense',
      title: 'Intense',
      slide: 60,
    },
    {
      id: 4,
      src: 'vividcool',
      title: 'Vivid Cool',
      slide: 80,
    },
    {
      id: 5,
      src: 'vividwarm',
      title: 'Vivid Warm',
      slide: 100,
    },
  ];
  const [cool, setCool] = React.useState(58);
  return (
    <>
      <div className="slider-field">
        <div className="slider-info">{cool}</div>
        <Slider
          axis="x"
          x={cool}
          xmax={100}
          xmin={0}
          onChange={({ x }) => setCool(x)}
        />
      </div>
      <div className="items">
        {items.map(item, index => (
          <Effect key={index} effectInfo={item} setSlide={setCool} />
        ))}
      </div>
      <img
        src={IMG.RIGHT_ARROW_ICON}
        className="right-arrow"
        alt="right arrow"
      />
    </>
  );
};

const ArEffect = ({ isModal }) => {
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <div className={isModal ? 'ar-effect active' : 'ar-effect'}>
        <div className="check-layout">
          <div className="card">
            <div className="close">
              <img className="back" src={IMG.BACK_GREEN} alt="back icon" />
            </div>
            <div className="card-header">
              <div className="title">AR effects</div>
            </div>
            <div className="check-body">
              <img
                src={IMG.HOME_CHECK_GREEN}
                className="check-icon"
                alt="check internet"
              />
              <div className="test-text">
                <span className="your">You have enabled Hearts</span>
              </div>
              <div className="camera-field">
                <img
                  src={IMG.CAMERA}
                  className="camera-img"
                  alt="camera field"
                />
                <div className="ar-settings">
                  <div className="settings-top">
                    <div className="setting-icon">
                      <img
                        src={IMG.FILTERS}
                        className={tab == 0 ? 'icon active' : 'icon'}
                        alt="filters icon"
                        onClick={() => setTab(0)}
                      />
                      <img
                        src={IMG.FACIAL}
                        className={tab == 1 ? 'icon active' : 'icon'}
                        alt="facial icon"
                        onClick={() => setTab(1)}
                      />
                      <img
                        src={IMG.AR_BACK}
                        className={tab == 2 ? 'icon active' : 'icon'}
                        alt="ar back"
                        onClick={() => setTab(2)}
                      />
                    </div>
                    <a href="#" className="clear-all">
                      Clear all
                    </a>
                  </div>
                  <div className="border-line" />
                  <div className="settings-body">
                    <div className="top">
                      <div className="left-text">Hearts</div>
                      <span className="clear">Clear</span>
                    </div>
                    {tab === 0 ? <Filters /> : null}
                    {tab === 1 ? <Facial /> : null}
                    {tab === 2 ? <Filters /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArEffect;
