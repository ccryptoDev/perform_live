// @ts-nocheck
/**
 *
 * ConfirmPassword container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import { Formik } from 'formik';
import { string, object, ref } from 'yup';
import LockIcon from 'assets/svg/password.svg';
import {
  saveResetPassword,
  resetPasswordSuccess,
} from './state/confirmPassword.actions';
import reducer from './state/confirmPassword.reducer';
import saga from './state/confirmPassword.saga';
import { injectReducer, injectSaga } from './confirmPassword.dependencies';
import './confirmPassword.scss';
import { TextInput } from '../../components/Inputs';
import TermsAndPrivacyPolicyLinks from '../../components/TermsAndPrivacyPolicyLinks';
import Button from '../../components/Common/Button';

const schema = object().shape({
  newPassword: string()
    .min(8, 'The field must be at least 8 characters')
    .required('The field is required'),
  confirmPassword: string()
    .oneOf([ref('newPassword')], 'Both Password should be equal')
    .required('The field is required'),
});

export const ConfirmPassword = props => {
  const history = useHistory();
  const { code } = useParams();

  const onSubmitHandler = ({ newPassword }, { setSubmitting }) => {
    props
      .saveResetPassword({ newPassword, code })
      .finally(() => setSubmitting(false));
  };

  useEffect(
    () => {
      if (props.passwordResetSuccess) {
        // redirect to login page
        history.push('/login');
        // reset signupSuccess to false
        props.resetPasswordSuccess(false);
      }
    },
    [props.passwordResetSuccess],
  );

  return (
    <div className="form_container confirm-password">
      <div className="form_wrapper">
        <span className="title font-light">
          <b>Reset</b> Password
        </span>
        <span className="text">
          Enter your new password and confirm password.
        </span>
        <Formik
          validationSchema={schema}
          initialValues={{
            newPassword: '',
            confirmPassword: '',
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
                type="password"
                placeholder="Enter password"
                name="newPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
                prepend={LockIcon}
                isInvalid={touched.newPassword && !!errors.newPassword}
                error={errors.newPassword}
              />
              <TextInput
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                prepend={LockIcon}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                error={errors.confirmPassword}
              />
              <div className="btn-group">
                <Button
                  disabled={isSubmitting}
                  background="transparent"
                  border="gradient"
                  className="mt-24"
                  onClick={() => history.push('/login')}
                >
                  Cancel
                </Button>
                <Button
                  background="gradient"
                  disabled={isSubmitting}
                  className="mt-24"
                  onClick={handleSubmit}
                >
                  Reset
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <TermsAndPrivacyPolicyLinks className="terms" />
    </div>
  );
};

ConfirmPassword.propTypes = {
  passwordResetSuccess: PropTypes.bool,
  saveResetPassword: PropTypes.func,
  resetPasswordSuccess: PropTypes.func,
};

const mapStateToProps = state => ({
  passwordResetSuccess: _get(
    state.confirmpassword,
    'passwordResetSuccess',
    false,
  ),
});

const mapDispatchToProps = dispatch => ({
  saveResetPassword: payload => dispatch(saveResetPassword(payload)),
  resetPasswordSuccess: payload => dispatch(resetPasswordSuccess(payload)),
});

// @ts-ignore
const withReducer = injectReducer({ key: 'confirmpassword', reducer });
// @ts-ignore
const withSaga = injectSaga({ key: 'confirmpassword', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ConfirmPassword);
