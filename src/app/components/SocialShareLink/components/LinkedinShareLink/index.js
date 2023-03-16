import React from 'react';
import PropTypes from 'prop-types';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import '../ShareLink.scss';

const LinkedinShareLink = ({ url, size=64 }) => (
  <div className="share-link-wrapper">
    <LinkedinShareButton url={url} className="share-link">
      <LinkedinIcon size={size} round className="share-icon" />
    </LinkedinShareButton>
    <div>Linkedin</div>
  </div>
);

LinkedinShareLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LinkedinShareLink;
