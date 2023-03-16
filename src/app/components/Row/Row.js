import React from 'react';
import { string, number } from 'prop-types';

import './styles.scss';

export const Row = ({ item, value, className, type }) => (
  <div className={className}>
    <div>{item}</div>
    <div className={type === 'bold' ? 'text-bold' : ''}>
      {Number(value) > 0 ? '$' : '-$'}
      {Math.abs(Number(value)).toFixed(2)}
    </div>
  </div>
);

Row.propTypes = {
  item: string,
  value: number,
  className: string,
  type: string,
};

export default Row;
