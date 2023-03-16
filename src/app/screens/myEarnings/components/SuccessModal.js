import React from 'react';
import propTypes from 'prop-types';

import formateDate from '../utils/fomateDate';
import Button from '../../../components/Common/Button';

const SuccessModal = ({ data, onClose }) => {
  return (
    <div className="modal-body">
      <div className="h2">Succcess</div>
      <div className="modal-data-success">
        <div className="modal-data__row">
          <div className="row-label h5">Request ID:</div>
          <div className="row-value">$ {data.requestId}</div>
        </div>
        <div className="modal-data__row">
          <div className="row-label h5">Redemption Amount:</div>
          <div className="row-value">{data.cashAmount}</div>
        </div>
        <div className="modal-data__row">
          <div className="row-label h5">Requested on:</div>
          <div className="row-value">{formateDate(data.createdAt)}</div>
        </div>
        <div className="modal-data__row">
          <div className="row-label h5">Estimated Arrival:</div>
          <div className="row-value">{formateDate(data.estimatedAt)}</div>
        </div>
        <div className="modal-success__action-btns">
          <Button onClick={onClose} size="large">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  data: propTypes.object,
  onClose: propTypes.func,
};

export default SuccessModal;
