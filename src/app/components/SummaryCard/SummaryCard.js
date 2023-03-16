import React from 'react';
import moment from 'moment';

import './styles.scss';
import { string, object } from 'prop-types';
import InnerCard from '../InnerCard';

export const SummaryCard = ({ date, address }) => {
  const { street, city, state, zip } = address;

  const shippingAddress = `${street}, ${city} ${state}, ${zip}`;

  return (
    <InnerCard>
      <div className="order-summary">
        <h2 className="h2">Summary</h2>
        <div className="order-summary__row">
          <div>Order Date</div>
          <div>{moment(date).format('MMM DD, YYYY')}</div>
        </div>
        <div className="order-summary__row">
          <div>Ship to</div>
          <div>{address.fullname}</div>
        </div>
        <div className="order-summary__row">
          <div>Shipping Address</div>
          <div>{shippingAddress}</div>
        </div>
      </div>
    </InnerCard>
  );
};

SummaryCard.propTypes = {
  date: string,
  address: object,
};

export default SummaryCard;
