import React from 'react';
import { object, string } from 'prop-types';

import './DigitalCard.scss';

const digitalCardTitle = type =>
  ({
    gift: 'Gift',
    stage: 'Join Stage',
    access: 'Paid Registration',
    payout: 'Payout',
  }[type]);

export const DigitalCard = ({ performance, paymentType, cashAmount }) => (
  <div className="digital-card-container bottom-line">
    <div className="digital-card-title">
      <div className="digital-card-header">
        {digitalCardTitle(paymentType) || paymentType}
      </div>
      <div className="digital-card-subheader">{performance.name}</div>
    </div>
    <div className="digital-card-cash">${cashAmount}</div>
  </div>
);

DigitalCard.propTypes = {
  performance: object,
  paymentType: string,
  cashAmount: string,
};

export default DigitalCard;
