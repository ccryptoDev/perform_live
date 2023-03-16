import React from 'react';
import propTypes from 'prop-types';

import RedemptionHistoryRow from './RedemptionHistoryRow';

const RedemptionHistory = ({ data }) => {
  return (
    <div className="redemption-history-content">
      <table className="content-table">
        <caption className="table-caption h3">Redemption history</caption>
        <thead>
          <tr className="redemption-history-row__header">
            <th className="column-header row-header-title">date</th>
            <th className="column-header row-header-title">payout account</th>
            <th className="column-header row-header-title">total</th>
            <th className="column-header row-header-title">status</th>
          </tr>
        </thead>
        <tbody class="history-body">
          {data.map(el => (
            <RedemptionHistoryRow data={el} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

RedemptionHistory.propTypes = {
  data: propTypes.array,
};

export default RedemptionHistory;
