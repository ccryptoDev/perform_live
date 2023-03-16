import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import {
  socialLoginUserInfo,
  setSocialLoginUserInfo,
} from '../../../state/app.actions';

const LinkedInLoginBtn = props => {
  const dispatch = useDispatch();
  const socialUserInfo = useSelector(state => state.global.socialUserInfo);
  const getAccessToken = data => {
    const payload = {
      queryParams: { code: data.code, redirect_uri: window.location.origin },
      paramsToReplace: { type: 'linkedIn' },
    };
    dispatch(socialLoginUserInfo(payload));
  };

  useEffect(
    () => {
      if (socialUserInfo.id) {
        const socialInfo = { ...socialUserInfo };
        dispatch(setSocialLoginUserInfo({}));
        props.socialLoginResponse('linkedIn', socialInfo);
      }
    },
    [socialUserInfo],
  );

  return (
    <div className="linkedin-login-wrapper linkedin">
      <LinkedIn
        // clientId="777g0xgk09f2rs"
        // clientId="77c177av73dfjs"
        // onSuccess={(_error, res) => props.socialLoginResponse('linkedin', res)}
        // onFailure={() => {}}
        // redirectUri="https://web-dev.performlive.live/"
        clientId="78ykbzhkdy6549"
        redirectUri={`${window.location.origin}/linkedin`}
        scope="r_liteprofile"
        onFailure={() => {}}
        onSuccess={res => getAccessToken(res)}
        style={{ background: '#0e76a8' }}
        // supportIE
        // redirectPath='/login'
      >
        <span />
      </LinkedIn>
    </div>
  );
};

export default LinkedInLoginBtn;
