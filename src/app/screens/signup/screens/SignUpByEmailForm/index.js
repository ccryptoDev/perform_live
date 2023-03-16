import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { string, object, boolean, ref } from 'yup';
import { TextInput, Checkbox } from 'app/components/Inputs';
import LockIcon from 'assets/svg/password.svg';
import UserIcon from 'assets/svg/user.svg';
import { signupWithEmailAction } from '../../state/signup.actions';
import './SignUpByEmailForm..scss';
import Button from '../../../../components/Common/Button';

const schema = object().shape({
  password: string()
    .min(8)
    .required('The field is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Both Password should be equal')
    .min(8)
    .required('The field is required'),
  aged: boolean().oneOf([true]),
  agreed: boolean().oneOf([true]),
});

const SignUpByEmailForm = () => {
  const dispatch = useDispatch();
  const signup = useSelector(state => state.signup);
  const onSubmitHandler = data => {
    dispatch(signupWithEmailAction({ ...data, email: signup.data.email }));
  };

  return (
    <div className="signup-by-email-form">
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
          aged: false,
          agreed: false,
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
        }) => (
          <form noValidate className="auth-form" onSubmit={handleSubmit}>
            <TextInput
              type="input"
              placeholder="Enter your first name"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              prepend={UserIcon}
              isInvalid={touched.firstName && !!errors.firstName}
              error={errors.firstName}
            />
            <TextInput
              type="input"
              placeholder="Enter your last name"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              prepend={UserIcon}
              isInvalid={touched.lastName && !!errors.lastName}
              error={errors.lastName}
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
            <Button background="gradient" size="large" onClick={handleSubmit}>
              Sign up
            </Button>
            <div className="checkboxes__wrapper">
              <Checkbox
                name="aged"
                className="mt-24"
                label="I am 16 years of age or over"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.aged}
                isInvalid={touched.aged && !!errors.aged}
              />
              <div className="terms-and-privacy-policy__agreed">
                <Checkbox
                  name="agreed"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.agreed}
                  isInvalid={touched.agreed && !!errors.agreed}
                />
                <div className="terms-and-privacy-policy-links checkbox__label">
                  I agree to PerformLive&nbsp;
                  <Link to="/userAgreement" className="link">
                    Terms and Conditions{' '}
                  </Link>
                  and{' '}
                  <Link to="/privacy" className="link">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpByEmailForm;
