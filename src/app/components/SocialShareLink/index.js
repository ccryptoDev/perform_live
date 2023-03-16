import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SocialShareLink.scss';
import {
  FacebookShareLink,
  LinkedinShareLink,
  TwitterShareLink,
  InstagramShareLink,
  CopyLink,
} from './components';

const SocialShareLink = ({ show, Hide }) => {
  const location = useLocation();
  const url = `https://web-dev.performlive.live${location.pathname}`;

  return (
    show && (
      <div className="modal social-share-link-modal" role="presentation">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Share to...</h2>
            <button
              type="button"
              tabIndex={0}
              className="close"
              onClick={Hide}
              onKeyUp={Hide}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <FacebookShareLink url={url} />
            <LinkedinShareLink url={url} />
            <TwitterShareLink url={url} />
            <InstagramShareLink url={url} />
            <CopyLink url={url} />
          </div>
        </div>
      </div>
    )
  );
};

SocialShareLink.propTypes = {
  show: PropTypes.bool.isRequired,
  Hide: PropTypes.func,
};
export default SocialShareLink;
