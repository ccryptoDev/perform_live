import React from 'react';
// import '../styles/effect.scss';
// import normal from '../assets/svg/plan/normal.svg';
import { IMG } from '../performer.dependencies';
import '../../../../../styles/effect.scss';

const Effect = ({ effectInfo, setSlide }) => (
  <div className="item">
    <img
      src={IMG.NORMAL}
      alt="effects background"
      // onClick={(e) => setSlide(effectInfo.slide)}
    />
    <span className="effect-name">{effectInfo.title}</span>
  </div>
);

export default Effect;
