import React from 'react';
import IMG from '../../utils/images';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="loading-container">
      <img src={IMG.SPINNER} alt="loader" />
    </div>
  );
}
