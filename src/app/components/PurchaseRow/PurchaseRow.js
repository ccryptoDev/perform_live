import React from 'react';
import { string, func, number } from 'prop-types';

import Button from '../Common/Button';
import './styles.scss';

export const PurchaseRow = ({ id, date, total, onClick }) => (
  <tr className="order-item-wrap" onClick={onClick}>
    <td className="id-data-container">
      <div className="order-id">{id}</div>
      <Button className="order-btn" onClick={onClick} background="transparent">
        Details
      </Button>
    </td>
    <td className="order-date-container">{date}</td>
    <td className="total-container">${total}</td>
  </tr>
);

PurchaseRow.propTypes = {
  id: number,
  date: string,
  total: string,
  onClick: func,
};

export default PurchaseRow;
