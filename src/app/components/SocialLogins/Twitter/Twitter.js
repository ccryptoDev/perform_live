import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import TwitterLogin from 'react-twitter-login';
import {
  getTwitterRequestToken,
  setSocialLoginUserInfo,
  setTwitterRequestToken,
  socialLoginUserInfo,
} from '../../../state/app.actions';

const TwitterLoginBtn = props => {
  const dispatch = useDispatch();
  const location = useLocation();
  const oauthToken = useSelector(state => state.global.twitterInfo.oauthToken);
  const oauthTokenSecret = useSelector(
    state => state.global.twitterInfo.oauthTokenSecret,
  );

  const oauthVerifier = useSelector(
    state => state.global.twitterInfo.oauthVerifier,
  );

  const socialUserInfo = useSelector(state => state.global.socialUserInfo);

  const useQuery = query => new URLSearchParams(query);
  const query = useQuery(location.search);
  const handleTwitterLogin = () => {
    dispatch(
      getTwitterRequestToken({
        queryParams: { redirect_uri: `${window.location.origin}/twitter` },
      }),
    );
  };

  useEffect(
    () => {
      console.log(
        'TwitterLoginBtn window'.toUpperCase(),
        oauthToken,
        oauthVerifier,
      );
      if (oauthToken && !oauthVerifier) {
        window.open(
          `https://twitter.com/oauth/authorize?oauth_token=${oauthToken}`,
          'myWindow',
          'width=600,height=100',
        );
        dispatch(setTwitterRequestToken({ oauthToken: '' }));

        const callback = event => {
          if (event.data && event.data.queryParams) {
            getUserInfo(event.data);
            window.removeEventListener('message', callback);
          }
        };

        window.addEventListener('message', callback, false);
      }
    },
    [oauthToken, oauthVerifier],
  );

  useEffect(() => {
    console.log('TwitterLoginBtn query'.toUpperCase(), query);
    if (query.get('oauth_token') && query.get('oauth_verifier')) {
      const payload = {
        queryParams: {
          oauth_token: query.get('oauth_token'),
          oauth_verifier: query.get('oauth_verifier'),
          oauthRequestTokenSecret: oauthTokenSecret,
        },
        paramsToReplace: { type: 'twitter' },
      };
      dispatch(
        setTwitterRequestToken({
          oauthToken: query.get('oauth_token'),
          oauthVerifier: query.get('oauth_verifier'),
        }),
      );

      window.opener.postMessage(payload, window.location.origin);
      // window.callback(payload);
      window.close();
    }
  }, []);

  const getUserInfo = twitterTokenPayload => {
    dispatch(socialLoginUserInfo(twitterTokenPayload));
    dispatch(
      setTwitterRequestToken({
        oauthToken: '',
        oauthVerifier: '',
      }),
    );
  };

  useEffect(
    () => {
      if (socialUserInfo.user_id) {
        const socialInfo = { ...socialUserInfo };
        dispatch(setSocialLoginUserInfo({}));
        props.socialLoginResponse('twitter', socialInfo);
      }
    },
    [socialUserInfo],
  );
  return (
    <div className="twitter-login-wrapper twitter">
      {/* <TwitterLogin
      authCallback={(_error, res) => {
        if (res.user_id) props.socialLoginResponse('twitter', res);
      }}
      consumerKey="AQtcJ27RN7dwgfZ0JnZ74RL5v"
      consumerSecret="I2uEadSpEbAX6bsGBc5CchRbBjC4qSYAfePIeoodewK5Gh8SpR"
      children={<button />}
    /> */}
      <button type="button" onClick={handleTwitterLogin} />
    </div>
  );
};

export default TwitterLoginBtn;
