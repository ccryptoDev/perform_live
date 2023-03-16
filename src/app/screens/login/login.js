/**
 *
 * Login container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { string, object } from 'yup';
import EmailIcon from 'assets/svg/email.svg';
import LockIcon from 'assets/svg/password.svg';
import { SocialLogin } from 'app/components/SocialLogins/SocialLogin/SocialLogin';
import { loginAction } from './state/login.actions';
import reducer from './state/login.reducer';
import saga from './state/login.saga';
import { injectReducer, injectSaga } from './login.dependencies';
import { TextInput } from '../../components/Inputs';
import TermsAndPrivacyPolicyLinks from '../../components/TermsAndPrivacyPolicyLinks';
import Button from '../../components/Common/Button';

const schema = object().shape({
  email: string()
    .email()
    .required('The field is required'),
  password: string()
    .min(8)
    .required('The field is required'),
});

export const Login = ({ login }) => {
  const onSubmitHandler = ({ email, password }, { setSubmitting }) => {
    login({ email, password }).finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className="form_container">
        {/* <div className="form_wrapper">
            <span className="title">Hello again!</span>
            <div className="input">
              <span className="input_title">Email</span>
              <input
                type="input"
                placeholder="Enter Your Email"
                className="input_field"
                name="email"
                value={userDeatils.email}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <div className="input_title_field">
                <span className="input_title">Password</span>
                <Link to="/forgetPassword" className="forgot">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                className="input_field"
                name="password"
                value={userDeatils.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn" onClick={handleSubmit} type="button">
              Login
            </button>
            <SocialLogin />
          </div> */}

        <div className="form_wrapper">
          <h4 className="title">
            <b>Login</b>
          </h4>
          <Formik
            validationSchema={schema}
            initialValues={{
              email: '',
              password: '',
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
              <form noValidate className="auth-form" onSubmit={handleSubmit}>
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
                <TextInput
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  prepend={LockIcon}
                  isInvalid={touched.password && !!errors.password}
                  error={errors.password}
                />
                <Link to="/forgetPassword" className="forgot">
                  Forgot password?
                </Link>
                <Button
                  background="gradient"
                  size="large"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
          <SocialLogin />
        </div>

        <div className="signup_link">
          <span className="text">New to Performlive? </span>
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </div>
        <TermsAndPrivacyPolicyLinks />
      </div>

      {/* <button type="button" onClick={() => props.defaultAction('Login')}>
      Change Default State To Login
    </button> */}
    </>
  );
};

Login.propTypes = {
  //  defaultState: PropTypes.any,
  login: PropTypes.func,
};

const mapStateToProps = () => ({
  // defaultState: _get(state.login, 'defaultState', null),
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(loginAction(payload)),
});

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
