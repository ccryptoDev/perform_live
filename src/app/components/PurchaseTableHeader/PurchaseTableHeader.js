import React from 'react';
import './styles.scss';

export const OrderTableHeader = () => (
  <tr className="order-table-header-content">
    <td className="order-id">Order #</td>
    <td className="order-date">Date</td>
    <td className="order-total">Total</td>
  </tr>
);

OrderTableHeader.propTypes = {};

export default OrderTableHeader;
