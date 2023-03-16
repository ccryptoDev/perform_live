import React from 'react';
import { Formik } from 'formik';
import { string, object, boolean } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';
import { socialLogin } from 'app/state/app.actions';
import EmailIcon from 'assets/svg/email.svg';
import UserIcon from 'assets/svg/user.svg';
import { TextInput, Checkbox } from 'app/components/Inputs';
import './SignUpBySocial.scss';
import Button from '../../../../components/Common/Button';

const schema = object().shape({
  email: string()
    .email()
    .required('The field is required'),
  aged: boolean().oneOf([true]),
});

const SignUpBySocial = () => {
  const dispatch = useDispatch();
  const signup = useSelector(store => store.signup);

  const onSubmitHandler = data => {
    dispatch(
      socialLogin({
        requestData: { ...signup.data, ...data },
        confirm: true,
      }),
    );
  };

  return (
    <div className="signup-by-social-form">
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: _get(signup.data, 'firstName', ''),
          lastName: _get(signup.data, 'lastName', ''),
          email: _get(signup.data, 'email', ''),
          aged: false,
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

            <Button btnType="submit">confirm</Button>

            <Checkbox
              name="aged"
              className="mt-24"
              label="I am 16 years of age or over"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.aged}
              isInvalid={touched.aged && !!errors.aged}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpBySocial;
