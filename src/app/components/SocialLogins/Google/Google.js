import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginBtn = props => {
  const responseGoogle = response => {
    console.log(response);
  };

  return (
    <div className="google-login-wrapper google">
      <GoogleLogin
        clientId="519745589012-fftin0d3v3td0g4vh715a2n74p5hpnnf.apps.googleusercontent.com"
        buttonText=""
        onSuccess={res => props.socialLoginResponse('google', res)}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        render={renderProps => (
          <button type="button" onClick={renderProps.onClick} />
        )}
      />
    </div>
  );
};

export default GoogleLoginBtn;
