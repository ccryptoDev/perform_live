import React from 'react';
import PropTypes from 'prop-types';
import './CookiesConsentMessage.scss';
import Button from '../Common/Button';

const CookiesConsentMessage = ({ isModalOpen, closeModal }) =>
  isModalOpen && (
    <div className="cookie-policy-message" role="presentation">
      <p>
        Our website uses cookies and other similar technologies to improve our
        site and your online experience. By continuing to use our website you
        consent to cookies being used.
      </p>
      <span>
        <Button type="secondary" className="confirm-btn" onClick={closeModal}>
          OK
        </Button>
      </span>
    </div>
  );

CookiesConsentMessage.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default CookiesConsentMessage;
