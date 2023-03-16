import React from 'react';
// import PropTypes from 'prop-types';
import './CircularSpinner.scss';
import Stop from './stop.svg';

export const CircularSpinner = ({ error }) =>
  !error ? (
    <div className="pl-circular-spinner">
      <div className="pl-circular-spinner__circle pl-circular-spinner__circle1" />
      <div className="pl-circular-spinner__circle pl-circular-spinner__circle2" />
      <div className="pl-circular-spinner__circle pl-circular-spinner__circle3" />
      <div className="pl-circular-spinner__circle pl-circular-spinner__circle4" />
      <div className="pl-circular-spinner__center" />
    </div>
  ) : (
    <div className="pl-circular-spinner--error">
      <div className="pl-circular-spinner__circle--error pl-circular-spinner__circle1--error" />
      <div className="pl-circular-spinner__circle--error pl-circular-spinner__circle2--error" />
      <div className="pl-circular-spinner__circle--error pl-circular-spinner__circle3--error" />
      <div className="pl-circular-spinner__circle--error pl-circular-spinner__circle4--error" />
      <div className="pl-circular-spinner__center--error">
        <img src={Stop} alt="stop" />
      </div>
    </div>
  );

CircularSpinner.propTypes = {};

export default CircularSpinner;
