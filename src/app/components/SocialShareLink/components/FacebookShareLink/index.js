import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import '../ShareLink.scss';

const FacebookShareLink = ({ url, size=64 }) => (
  <div className="share-link-wrapper">
    <FacebookShareButton url={url} className="share-link">
      <FacebookIcon size={size} round className="share-icon" />
    </FacebookShareButton>
    <div>Facebook</div>
  </div>
);

FacebookShareLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FacebookShareLink;
