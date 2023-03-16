import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TermsAndPrivacyText.scss';

const TermsAndPrivacyText = () => {
  return (
    <div className="agree-text f-body-14">
      I have read and agree with Performlive &nbsp;
      <Link to="/privacy" className="link">
        Privacy Policy
      </Link>{' '}
      &nbsp; and &nbsp;
      <Link to="/userAgreement" className="link">
        End User License Agreement
      </Link>
      .&nbsp;
    </div>
  );
};

TermsAndPrivacyText.propTypes = {};

export default TermsAndPrivacyText;
