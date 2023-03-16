import React from 'react';
import PropTypes from 'prop-types';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

const GOSPaymentSuccess = ({
  performanceData,
  onClose,
  setCurrentSidebarView,
}) => {
  return (
    <div className="sidebar-cart pay-gos-success">
      <SidebarHeader
        title="Payment is success"
        onClose={() => setCurrentSidebarView('main')}
      />
      <div className="pay-gos-success__content">
        <div className="h4">Transaction was processed.</div>
        <div className="f-body-15">
          {performanceData.performer.firstName}{' '}
          {performanceData.performer.lastName} will let you on stage soon!
        </div>
      </div>
    </div>
  );
};

GOSPaymentSuccess.propTypes = {};

export default GOSPaymentSuccess;
