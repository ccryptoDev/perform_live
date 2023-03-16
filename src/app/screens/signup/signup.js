/**
 *
 * Signup container
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { Link } from 'react-router-dom';
import EmailForm from './screens/EmailForm';
import SignUpByEmailForm from './screens/SignUpByEmailForm';
import SignUpBySocial from './screens/SignUpBySocial';
import { saveSuccess, clearData } from './state/signup.actions';
import reducer from './state/signup.reducer';
import saga from './state/signup.saga';
import { injectReducer, injectSaga } from './signup.dependencies';
import './signup.scss';
import TermsAndPrivacyPolicyLinks from '../../components/TermsAndPrivacyPolicyLinks';
import VerifyEmailCodeModal from './components/VerifyEmailCodeModal';

export const Signup = ({
  provider,
  clearState,
  // success,
  // saveSuccessAction,
}) => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  // const history = useHistory();

  const renderComponent = () => {
    switch (provider) {
      case 'Google':
      case 'Facebook':
      case 'Twitter':
      case 'LinkedIn':
        return <SignUpBySocial />;
      case 'Email':
        return <SignUpByEmailForm />;
      default:
        return <EmailForm />;
    }
  };

  // useEffect(
  //   () => {
  //     if (success) {
  //       // setShowVerifyModal(true);
  //       saveSuccessAction(null);
  //       history.push('/login');
  //     }
  //   },
  //   [success],
  // );

  useEffect(() => clearState, []);

  return (
    <div className="signup-container">
      <div className="form_container">
        <div className="form_wrapper">
          <span className="title font-light">
            <b>Sign</b> {provider ? `up with ${provider}` : 'up'}
          </span>
          {renderComponent()}
        </div>
        <div className="signup_link">
          <span className="text">Already have an account?</span>
          <Link to="/login" className="link">
            Login here
          </Link>
        </div>
        <TermsAndPrivacyPolicyLinks />
      </div>
      <VerifyEmailCodeModal
        show={showVerifyModal}
        Hide={() => setShowVerifyModal(false)}
      />
    </div>
  );
};

Signup.propTypes = {
  // success: PropTypes.bool,
  // saveSuccessAction: PropTypes.func,
  clearState: PropTypes.func,
  provider: PropTypes.string,
};

const mapStateToProps = state => ({
  success: _get(state.signup, 'signupSuccess', false),
  provider: _get(state.signup, 'provider', null),
});

const mapDispatchToProps = dispatch => ({
  saveSuccessAction: payload => dispatch(saveSuccess(payload)),
  clearState: () => dispatch(clearData()),
});

const withReducer = injectReducer({
  key: 'signup',
  reducer,
  blacklist: ['provider', 'data'],
});
const withSaga = injectSaga({ key: 'signup', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Signup);
