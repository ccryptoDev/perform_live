/**
 *
 * SocialLogin
 *
 */

import { socialLogin } from 'app/state/app.actions';
import React, { useEffect } from 'react';
import { get as _get } from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FacebookLoginBtn from '../Facebook/Facebook';
import GoogleLoginBtn from '../Google/Google';
import LinkedInLoginBtn from '../LinkedIn/LinkedIn';
import TwitterLoginBtn from '../Twitter/Twitter';
// import PropTypes from 'prop-types';

const useQuery = query => new URLSearchParams(query);

export const SocialLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery(location.search);
  const history = useHistory();

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
  }, []); // Add observable in array if you want the hook to run on updating those values

  const handleSocialLogin = (type, res) => {
    let requestData;
    console.log('SocialLogin', res, type);
    switch (type) {
      case 'facebook': {
        const [name, lastname] = _get(res, 'name', '').split(' ');

        requestData = {
          type,
          socialId: _get(res, 'id', null),
          firstName: name,
          lastName: lastname,
          email: _get(res, 'email', ''),
          fullName: _get(res, 'name', ''),
          imageUrl: _get(res, 'picture.data.url', ''),
        };
        break;
      }
      case 'google':
        requestData = {
          type,
          socialId: _get(res, 'googleId', null),
          firstName: _get(res.profileObj, 'givenName', ''),
          lastName: _get(res.profileObj, 'familyName', ''),
          email: _get(res.profileObj, 'email', ''),
          imageUrl: _get(res.profileObj, 'imageUrl', ''),
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
          email: _get(res, 'email', undefined),
          fullName: _get(res, 'screen_name', ''),
        };
        break;
      case 'linkedIn':
        requestData = {
          type,
          socialId: _get(res, 'id', null),
          firstName: _get(res, 'localizedFirstName', ''),
          lastName: _get(res, 'localizedLastName', ''),
          email: _get(res, 'localizedEmail', undefined),
          fullName: `${_get(res, 'localizedFirstName', '')} ${_get(
            res,
            'localizedLastName',
            '',
          )}`,
          imageUrl: _get(
            res,
            'profilePicture.displayImage~.elements[2].identifiers[0].identifier',
            '',
          ),
        };
        break;
      default:
        requestData = {};
    }

    dispatch(socialLogin({ requestData }));
  };
  return (
    <div className="social social-logins">
      <span>Or continue with</span>
      <div className="btn_group">
        <GoogleLoginBtn socialLoginResponse={handleSocialLogin} />
        <FacebookLoginBtn socialLoginResponse={handleSocialLogin} />
        <LinkedInLoginBtn socialLoginResponse={handleSocialLogin} />
        <TwitterLoginBtn socialLoginResponse={handleSocialLogin} />
      </div>
    </div>
  );
};

SocialLogin.propTypes = {};

export default SocialLogin;
