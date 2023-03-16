import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookIcon } from 'react-share';

const FacebookLoginBtn = props => {
  const responseFacebook = response => {
    console.log(response);
  };

  return (
    <div className="facebook">
      <FacebookLogin
        appId="3771023316273958"
        fields="name,email,picture"
        onFailure={responseFacebook}
        callback={res => props.socialLoginResponse('facebook', res)}
        render={renderProps => (
          <button type="button" onClick={renderProps.onClick}>
            <FacebookIcon size={36} round className="share-icon" />
          </button>
        )}
      />
    </div>
  );
};

export default FacebookLoginBtn;
