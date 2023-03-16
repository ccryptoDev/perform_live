import React from 'react';
import propTypes from 'prop-types';

import formateDate from '../utils/fomateDate';
import convertStatus from '../utils/convertStatus';

const RedemptionHistoryRow = ({ data }) => {
  const { id, createdAt, status, cashAmount, accountLast4 } = data;

  return (
    <tr key={id} className="redemption-history-row__data">
      <td className="column-data row-data__value">{formateDate(createdAt)}</td>
      <td className="column-data row-data__value column-data-bank">
        <div className="h4 bank-data">Bank Direct Deposit</div>
        •••••
        {accountLast4}
      </td>
      <td className="column-data h4">$ {cashAmount}</td>
      <td className="column-data row-data__status">{convertStatus(status)}</td>
    </tr>
  );
};

RedemptionHistoryRow.propTypes = {
  data: propTypes.object,
};

export default RedemptionHistoryRow;
