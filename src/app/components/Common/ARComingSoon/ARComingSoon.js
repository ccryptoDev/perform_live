import React from 'react';
import IMG from '../../../utils/images';
import './ARComingSoon.scss';

export default function ARComingSoon() {
  return (
    <div className="update-ar">
      <img
        src={IMG.AR_COMING_ICON}
        className="updatear-icon"
        alt="update-ar icon"
      />
      <div className="ar-coming-label">
        <h3>AR</h3>
        <span>Coming soon</span>
      </div>
    </div>
  );
}
