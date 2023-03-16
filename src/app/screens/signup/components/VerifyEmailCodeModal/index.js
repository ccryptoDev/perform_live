import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCodeInput from 'react-verification-code-input';
import Button from '../../../../components/Common/Button/Button';
import './VerifyEmailCodeModal.scss';

const VerifyEmailCodeModal = ({
  email,
  show,
  Hide,
  resend,
  verifyEmailCode,
  errorMessage,
}) => {
  const [code, setCode] = useState('');
  return (
    show && (
      <div className="modal verify-email-code-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              Verify <span>your email</span>
            </h2>
            <button
              type="button"
              tabIndex={0}
              className="close"
              onClick={Hide}
              onKeyUp={Hide}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              We have sent a verification code to <br />
              <b>{email}</b> <br />
              If it doesn’t appear within a few minutes, check your Spam folder
            </div>
            <ReactCodeInput
              placeholder={Array.from({ length: 4 }).fill(' ')}
              fieldWidth={72}
              fieldHeight={48}
              fields={4}
              onChange={setCode}
              autoFocus={false}
              className="code-inputs"
            />
            <span className="error-message">{errorMessage}</span>
            <Button
              type="primary"
              size="large"
              background="gradient"
              disabled={code.toString().length < 4}
              onClick={() => {
                verifyEmailCode(code);
              }}
            >
              Verify
            </Button>
            <Button
              type="secondary"
              size="medium"
              background="transparent"
              textColor="blue"
              className="btn-link"
              onClick={() => {
                setCode('');
                resend();
              }}
            >
              Resend code
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

VerifyEmailCodeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  Hide: PropTypes.func,
};

export default VerifyEmailCodeModal;
