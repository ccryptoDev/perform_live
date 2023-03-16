import React from 'react';
import '../../../../../styles/gettingstage.scss';
import Toggle from 'react-toggle';
import { IMG } from '../performer.dependencies';

// import BACK_BTN from '../../assets/svg/plan/back-btn.svg';
// import CHECK_ICON from '../../assets/svg/plan/check-icon.svg';
// import MINUS_ICON from '../../assets/svg/plan/minus-icon.svg';
// import PLUS_ICON from '../../assets/svg/plan/plus-icon.svg';

const CountItem = () => {
  const [count, setCount] = React.useState(1);
  const decrementCount = () => {
    setCount(count - 1);
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  if (count < 0) {
    return setCount(0);
  }
  return (
    <>
      <div className="input-text">
        <img
          src={IMG.MINUS_ICON}
          className="minus"
          alt="minus icon"
          onClick={decrementCount}
        />
        <span className="text">{count}</span>
        <img
          src={IMG.PLUS_ICON}
          className="plus"
          alt="plus icon"
          onClick={incrementCount}
        />
      </div>
    </>
  );
};

const GettingStage = ({ isModal }) => (
  <>
    <div className={isModal ? 'getting-stage active' : 'getting-stage'}>
      <div className="check-layout">
        <div className="card">
          <div className="close">
            <img className="back" src={IMG.BACK_BTN} alt="back icon" />
          </div>
          <div className="card-header">
            <div className="title">Getting to stage</div>
          </div>
          <div className="check-body">
            <img
              src={IMG.CHECK_ICON}
              className="check-icon"
              alt="check internet"
            />
            <div className="test-text">
              <span className="your">
                You will be able to interact with people on the stage
              </span>
            </div>
            <div className="border-line" />
          </div>
          <div className="bottom">
            <div className="allow">
              <Toggle icons={false} />
              <span className="allow-text">Allow people to join the stage</span>
            </div>
            <div className="setting">
              <CountItem />
              <div className="setting-text">
                person can join the stage at one time for
              </div>
              <select className="setting-input">
                <option>free</option>
                <option>$3</option>
                <option>$5</option>
                <option>$8</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default GettingStage;
