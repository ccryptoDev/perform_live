import React from 'react';
import PropTypes from 'prop-types';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

const GiftSuccessView = ({ handleViewChange, performance }) => {
  const onClose = () => handleViewChange('main');
  const { firstName, lastName } = performance.performer;
  return (
    <div className="sidebar-cart gift-success">
      <SidebarHeader title="Payment is success" onClose={onClose} />
      <div className="h4">Transaction was processed</div>
      <div className="f-body-15">
        {firstName} {lastName} received a gift from you!
      </div>
    </div>
  );
};

GiftSuccessView.propTypes = {};

export default GiftSuccessView;
