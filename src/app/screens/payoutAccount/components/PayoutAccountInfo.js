import React from 'react';
import propTypes from 'prop-types';

import trashIcon from '../assets/trash.svg';

const PayoutAccountInfoRow = ({ label, data }) => {
  const labelData = label.replaceAll('_', ' ');

  return (
    <div className="row">
      <div className="h5">{labelData}: </div>
      <div className="row-data"> {data}</div>
    </div>
  );
};

PayoutAccountInfoRow.propTypes = {
  label: propTypes.string,
  data: propTypes.string,
};

const PayoutAccountInfo = ({ data, handleDelete }) => {
  const accountData = {
    Account_holder_name: data.holderName,
    Account_number: `**** ${data.last4}`,
    Routing_number: data.routingNumber,
    Account_holder_type: data.accountType,
    Currency: data.currency,
    Contry: data.country,
  };

  return (
    <div className="payout-account-info">
      <ul>
        {Object.entries(accountData).map(([key, value]) => (
          <PayoutAccountInfoRow key={key} label={key} data={value} />
        ))}
      </ul>
      <div className="edit-button" onClick={handleDelete}>
        <img alt="edit-icon" src={trashIcon} />
      </div>
    </div>
  );
};

PayoutAccountInfo.propTypes = {
  data: propTypes.object,
  handleDelete: propTypes.func,
};

export default PayoutAccountInfo;
