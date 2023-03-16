/**
 *
 * ForgotPasswordForms container
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import EmailIcon from 'assets/svg/email.svg';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { Link, useHistory } from 'react-router-dom';
import {
  forgetPassword,
  forgetPasswordSuccess,
} from './state/forgotPasswordForms.actions';
import reducer from './state/forgotPasswordForms.reducer';
import saga from './state/forgotPasswordForms.saga';
import { injectReducer, injectSaga } from './forgotPasswordForms.dependencies';

import './forgotPasswordForms.scss';
import TermsAndPrivacyPolicyLinks from '../../components/TermsAndPrivacyPolicyLinks';
import { TextInput } from '../../components/Inputs';
import Button from '../../components/Common/Button';

const schema = object().shape({
  email: string()
    .email()
    .required('The field is required'),
});

export const ForgotPasswordForms = props => {
  const [forgetSuccess, setForgetSuccess] = useState(false);
  const history = useHistory();

  const onSubmitHandler = (data, { setSubmitting }) => {
    props.forgetPassword(data).finally(() => setSubmitting(false));
  };

  useEffect(
    () => {
      if (props.forgetSuccess) {
        setForgetSuccess(true);
        props.forgetPasswordSuccess(false);
      }
    },
    [props.forgetSuccess],
  );

  return (
    <>
      {!forgetSuccess ? (
        <div className="forgotpasswordforms-container">
          <div className="form_container">
            {/* <div className="form_wrapper">
              <div className="back">
                <span className="icon" />
                <Link to="/" className="text">
                  Back to Login
                </Link>
              </div>
              <div className="line" />
              <span className="title">Forgot password?</span>
              <span className="text">
                Enter your email address and we will send you a link to reset
                your password.
              </span>
              <div className="input">
                <span className="input_title">Email</span>
                <input
                  type="input"
                  placeholder="Enter Your Email"
                  className="input_field"
                  onChange={e => handleInputChange(e, 'email')}
                />
              </div>
              <button className="btn" onClick={handleSubmit}>
                Reset My Password
              </button>
            </div> */}

            <div className="form_wrapper">
              <span className="title font-light">
                <b>Forgot</b> Password
              </span>
              <span className="text text-center">
                Enter your email address and we will send you a link to reset
                your password.
              </span>
              <Formik
                validationSchema={schema}
                initialValues={{
                  email: '',
                }}
                onSubmit={onSubmitHandler}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <form
                    noValidate
                    className="auth-form mt-40"
                    onSubmit={handleSubmit}
                  >
                    <TextInput
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      prepend={EmailIcon}
                      isInvalid={touched.email && !!errors.email}
                      error={errors.email}
                    />
                    <div className="btn-group">
                      <Button
                        disabled={isSubmitting}
                        background="transparent"
                        border="gradient"
                        onClick={() => history.push('/login')}
                      >
                        Cancel
                      </Button>
                      <Button
                        background="gradient"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <TermsAndPrivacyPolicyLinks className="terms" />
          {/* <button type="button" onClick={() => props.defaultAction('ForgotPasswordForms')}>
      Change Default State To ForgotPasswordForms
    </button> */}
        </div>
      ) : (
        <div className="confirmpassword-container">
          <div className="form_container">
            {/* <div className="form_wrapper">
              <span className="title">Check Your Inbox!</span>
              <span className="text">
                Check your email for a link to reset your password. If it
                doesn’t appear within a few minutes, check your spam folder.
              </span>
              <button
                className="btn"
                onClick={() => props.defaultAction('ConfirmPassword')}
              >
                <Link to="/">Return to Login</Link>
              </button>
            </div> */}

            <div className="form_wrapper">
              <span className="title reset-password">
                <b>Check</b> Your Inbox
              </span>
              <span className="text reset-password">
                The link to reset your password has been sent. If this is not
                received within a few minutes, please check your spam folder.
              </span>
              <button className="btn btn-bg-gradient btn-large" type="button">
                <Link to="/login">Return to Login</Link>
              </button>
            </div>
            <div className="mt-16 contact-us">
              <span>Having problems? </span>
              <span>
                Contact us via{' '}
                <Link to="/?contact=true" className="help-center">
                  Help Center
                </Link>
              </span>
            </div>
          </div>
          <TermsAndPrivacyPolicyLinks />
          {/* <button type="button" onClick={() => props.defaultAction('ConfirmPassword')}>
      Change Default State To ConfirmPassword
    </button> */}
        </div>
      )}
    </>
  );
};

ForgotPasswordForms.propTypes = {
  forgetSuccess: PropTypes.bool,
  forgetPassword: PropTypes.func,
  forgetPasswordSuccess: PropTypes.func,
};

const mapStateToProps = state => ({
  forgetSuccess: _get(state.forgotpasswordforms, 'forgetSuccess', false),
});

const mapDispatchToProps = dispatch => ({
  forgetPassword: payload => dispatch(forgetPassword(payload)),
  forgetPasswordSuccess: payload => dispatch(forgetPasswordSuccess(payload)),
});

const withReducer = injectReducer({ key: 'forgotpasswordforms', reducer });
const withSaga = injectSaga({ key: 'forgotpasswordforms', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPasswordForms);
