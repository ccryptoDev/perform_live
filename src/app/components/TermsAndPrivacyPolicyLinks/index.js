import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TermsAndPrivacyPolicyLinks.scss';

const TermsAndPrivacyPolicyLinks = ({ className }) => (
  <div className={['terms-and-privacy-policy-links', className].join(' ')}>
    By continuing, you agree to PerformLive <br />
    <Link to="/userAgreement" className="link">
      Terms of Service
    </Link>
    &nbsp;and&nbsp;
    <Link to="/privacy" className="link">
      Privacy Policy
    </Link>
    .
  </div>
);

TermsAndPrivacyPolicyLinks.propTypes = {
  className: PropTypes.string,
};

export default TermsAndPrivacyPolicyLinks;
