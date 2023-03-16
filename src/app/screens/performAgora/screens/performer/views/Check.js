import React from 'react';
import '../../../../../styles/check.scss';
import { IMG } from '../performer.dependencies';

const List = ({ listInfo }) => (
  <>
    <div className="list">
      <div className="talent">
        <div className="start">
          <div className="icon">{listInfo.icon}</div>
          <div className="info">
            <div className="text">{listInfo.title}</div>
            <div className="text-op">{listInfo.info}</div>
          </div>
        </div>
        <div className="end">
          <img
            src={IMG.CHECKOUT}
            className="checkout-icon"
            alt="chckout icon"
          />
          <img src={IMG.VECTOR1} className="vector1" alt="vector1" />
        </div>
      </div>
    </div>
  </>
);

const Check = () => {
  const items1 = [
    {
      icon: '📶',
      title: 'Internet Connection',
      info: 'Connection: Perfect',
    },
    {
      icon: '📸',
      title: 'Camera and Effects',
      info: 'Apply filters and AR',
    },
  ];
  const items2 = [
    {
      icon: '🛍',
      title: 'Products',
      info: '6 Product cards added',
    },
    {
      icon: '⚙️',
      title: 'Settings',
      info: 'Joining the stage allowed',
    },
  ];
  const SliderList = () => (
    <>
      <div className="slider-list" />
    </>
  );
  const sliderItems = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className="check">
        <div className="check-layout">
          <div className="card">
            <div className="close">
              <img className="close-btn" src={IMG.CLOSE} alt="close icon" />
            </div>
            <div className="card-header">
              <div className="title">Check</div>
              <div className="question">
                Check if everything is ready for
                <br />
                <span className="bag-fashion">Bags and Fashion</span>{' '}
                performance 😉
              </div>
            </div>
            <div className="context">
              <span className="bold">5</span>
              &nbsp;/&nbsp;5
            </div>
            <div className="check-body">
              {items1.map(item => (
                <List listInfo={item} />
              ))}
              <div className="list">
                <div className="talent">
                  <div className="start">
                    <div className="icon">🎤</div>
                    <div className="info">
                      <div className="text">Microphone</div>
                      <div className="text-op">
                        {sliderItems.map(sliderItem => (
                          <SliderList />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="end">
                    <img
                      src={IMG.CHECKOUT}
                      className="checkout-icon"
                      alt="chckout icon"
                    />
                    <img src={IMG.VECTOR1} className="vector1" alt="vector1" />
                  </div>
                </div>
              </div>
              {items2.map(item => (
                <List listInfo={item} />
              ))}
            </div>
            <div className="btns-group">
              <div className="chat-btn">
                <img className="chat-img" src={IMG.CHAT_ICON} alt="chat icon" />
              </div>
              <button className="start">
                Start in <span className="set-time">29:59</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Check;
