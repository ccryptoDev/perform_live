import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCodeInput from 'react-verification-code-input';
import Button from '../../../../components/Common/Button/Button';
import './VerifyPhoneCodeModal.scss';

const VerifyPhoneCodeModal = ({phone, show, Hide, resend, verifyPhoneCode, errorMessage }) => {
  const [code, setCode] = useState(false);
  return (
    show && (
      <div className="modal verify-phone-code-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              Verify <span>phone number</span>
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
              We have sent a verification code to 
              <b> +{phone}</b>
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
              onClick={()=>{
                verifyPhoneCode(code)
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
                setCode('')
                resend()
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

VerifyPhoneCodeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  Hide: PropTypes.func,
};

export default VerifyPhoneCodeModal;
