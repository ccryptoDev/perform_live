import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import '../ShareLink.scss';

const InstagramShareLink = ({ url, isLabel = true }) => {
  const onCallbackHandler = res => {
    console.log(res, window.FB, url);
  };

  return (
    <div className="share-link-wrapper">
      <FacebookLogin
        appId="3771023316273958"
        scope="instagram_content_publish"
        fields="name,email,picture"
        callback={onCallbackHandler}
        render={renderProps => (
          <button
            type="button"
            className="share-link"
            onClick={renderProps.onClick}
          />
        )}
      />
      {isLabel && <div>Instagram</div>}
    </div>
  );
};

InstagramShareLink.propTypes = {
  url: PropTypes.string.isRequired,
  isLabel: PropTypes.bool,
};

export default InstagramShareLink;
