import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { useDispatch } from 'react-redux';
import EmailIcon from 'assets/svg/email.svg';
import { TextInput } from 'app/components/Inputs';
import './EmailForm.scss';
import _get from 'lodash/get';
// import GoogleLoginBtn from 'app/components/SocialLogins/Google/Google';
// import FacebookLoginBtn from 'app/components/SocialLogins/Facebook/Facebook';
// import LinkedInLoginBtn from 'app/components/SocialLogins/LinkedIn/LinkedIn';
// import TwitterLoginBtn from 'app/components/SocialLogins/Twitter/Twitter';
import { getAvailableEmail, saveSocialData } from '../../state/signup.actions';
import SocialLogin from '../../../../components/SocialLogins/SocialLogin/SocialLogin';
import Button from '../../../../components/Common/Button';

const schema = object().shape({
  email: string()
    .email()
    .required('The field is required'),
});

const useQuery = query => new URLSearchParams(query);

const EmailForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery(location.search);

  const onSubmitHandler = data => {
    dispatch(getAvailableEmail(data));
  };

  useEffect(() => {
    if (query.get('error')) {
      query.get('error_description');
      const errorMessage =
        query.get('error_description') || 'Login failed. Please try again.';
      window.opener.postMessage(
        {
          error: query.get('error'),
          state: query.get('state'),
          errorMessage,
          from: 'Linked In',
        },
        window.location.origin,
      );
      // Close tab if user cancelled login
      if (query.get('error') === 'user_cancelled_login') {
        window.close();
      }
    }

    if (query.get('code')) {
      // Handling linkedin Redirect
      window.opener.postMessage(
        {
          code: query.get('code'),
          state: query.get('state'),
          from: 'Linked In',
        },
        window.location.origin,
      );
      // const linkedinInfo = location.search.split('=');
      // POST request using fetch()
    }
  }, []);

  const handleSocialLogin = (type, res) => {
    let requestData;
    console.log('EmailForm', type, res);
    switch (type) {
      case 'facebook':
        requestData = {
          type,
          socialId: _get(res, 'id', null),
          firstName: _get(res, 'name', ''),
          lastName: '',
          email: _get(res, 'email', ''),
          fullName: _get(res, 'name', ''),
        };
        break;
      case 'google':
        requestData = {
          type,
          socialId: _get(res, 'googleId', null),
          firstName: _get(res.profileObj, 'givenName', ''),
          lastName: _get(res.profileObj, 'familyName', ''),
          email: _get(res.profileObj, 'email', ''),
          fullName: `${_get(res.profileObj, 'givenName', '')} ${_get(
            res.profileObj,
            'familyName',
            '',
          )}`,
        };
        break;
      case 'twitter':
        requestData = {
          type,
          socialId: _get(res, 'user_id', null),
          firstName: _get(res, 'screen_name', ''),
          lastName: '',
          email: _get(res, 'email', ''),
          fullName: _get(res, 'screen_name', ''),
        };
        break;
      case 'linkedIn':
        requestData = {
          type,
          socialId: _get(res, 'id', null),
          firstName: _get(res, 'localizedFirstName', ''),
          lastName: _get(res, 'localizedLastName', ''),
          email: _get(res, 'localizedEmail', ''),
          fullName: `${_get(res, 'localizedFirstName', '')} ${_get(
            res,
            'localizedLastName',
            '',
          )}`,
        };
        break;
      default:
        requestData = {};
    }

    dispatch(saveSocialData(requestData));
  };

  return (
    <div className="email-step">
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
            <Button background="gradient" size="large" onClick={handleSubmit}>
              Continue
            </Button>
          </form>
        )}
      </Formik>
      {/* <div className="social social-logins">
        <span>Or continue with</span>
        <div className="btn_group">
          <GoogleLoginBtn socialLoginResponse={handleSocialLogin} />
          <FacebookLoginBtn socialLoginResponse={handleSocialLogin} />
          <LinkedInLoginBtn socialLoginResponse={handleSocialLogin} />
          <TwitterLoginBtn socialLoginResponse={handleSocialLogin} />
        </div>
      </div> */}
      <SocialLogin />
    </div>
  );
};

export default EmailForm;
