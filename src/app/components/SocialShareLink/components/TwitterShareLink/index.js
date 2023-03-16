import React from 'react';
import PropTypes from 'prop-types';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import '../ShareLink.scss';

const TwitterShareLink = ({ url, size=64 }) => (
  <div className="share-link-wrapper">
    <TwitterShareButton url={url} className="share-link">
      <TwitterIcon size={size} round className="share-icon" />
    </TwitterShareButton>
    <div>Twitter</div>
  </div>
);

TwitterShareLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default TwitterShareLink;
