import React from 'react';
import IMG from 'app/utils/images';

export const Effect = ({ effectInfo, setSlide }) => (
  <div className="item">
    <img src={IMG.USER} alt="back" />
    <span className="effect-name">{effectInfo.title}</span>
  </div>
);
