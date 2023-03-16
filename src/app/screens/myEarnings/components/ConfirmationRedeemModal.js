import React from 'react';
import propTypes from 'prop-types';
import Button from '../../../components/Common/Button';
import ErrorModal from './ErrorModal';
import LoadingModal from './LoadingModal';
import SuccessModal from './SuccessModal';

const ConfirmationRedeemModal = ({
  onClose,
  onSubmit,
  userData,
  spinner,
  status,
  payoutResult,
}) => {
  const { holderName, routingNumber, last4, customerEarnings } = userData;

  return (
    <div className="confirm-redeem-modal">
      <div className="modal-bg">
        {spinner && <LoadingModal />}
        {status === 'success' && (
          <SuccessModal data={payoutResult} onClose={onClose} />
        )}
        {status === 'failed' && (
          <ErrorModal error={payoutResult} onClose={onClose} />
        )}
        {!spinner &&
          !status && (
            <div className="modal-body">
              <div className="h2">Confirmation</div>
              <div className="modal-data">
                <div className="modal-data__row">
                  <div className="row-label h5">Redemption Amount:</div>
                  <div className="row-value">$ {customerEarnings}</div>
                </div>
                <div className="modal-data__row">
                  <div className="row-label h5">Account holder name:</div>
                  <div className="row-value">{holderName}</div>
                </div>
                <div className="modal-data__row">
                  <div className="row-label h5">Account number:</div>
                  <div className="row-value">
                    •••••
                    {last4}
                  </div>
                </div>
                <div className="modal-data__row">
                  <div className="row-label h5">Routing number:</div>
                  <div className="row-value">{routingNumber}</div>
                </div>
                <div className="modal-data__description">
                  Processing times are within 2-3 business days depending on
                  your bank. The exact timing of when it posts to your account
                  is dependent on your specific bank's processes.
                </div>
                <div className="modal-confirm__action-btns">
                  <Button
                    background="transparent"
                    border="gradient"
                    onClick={onClose}
                    size="large"
                  >
                    CANCEL
                  </Button>
                  <Button
                    onClick={() =>
                      onSubmit({ amount: Number(customerEarnings) })
                    }
                    size="large"
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

ConfirmationRedeemModal.propTypes = {
  onClose: propTypes.func,
  onSubmit: propTypes.func,
  userData: propTypes.object,
  spinner: propTypes.bool,
  status: propTypes.string,
  payoutResult: propTypes.object,
};

export default ConfirmationRedeemModal;
