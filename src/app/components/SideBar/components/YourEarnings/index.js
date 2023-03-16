import React from 'react';
import { useQuery } from 'react-query';
import useApi from '../../../../hooks/api';
import { beautifyPrice } from '../../../../utils/numbers';
import './YourEarnings.scss';

const YourEarnings = () => {
  const { getPaymentPerformerPaidEarnings } = useApi('payment');
  const { data } = useQuery('earnings', () =>
    getPaymentPerformerPaidEarnings(),
  );

  return (
    <div className="earning">
      <span className="text">Your Earnings</span>
      <span className="price">
        ${beautifyPrice((data && data.earnings) || 0)}
      </span>
    </div>
  );
};

export default YourEarnings;
