import React from 'react';
import { string, node } from 'prop-types';
import './styles.scss';

const InnerCard = ({ children }) => {
  return (
    <div className="inner-card-container">
      {children}
    </div>
  );
};

InnerCard.propTypes = {
  children: node,
};

export default InnerCard;