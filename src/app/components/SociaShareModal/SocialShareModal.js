import copy from 'copy-to-clipboard';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import IMG from 'app/utils/images';
import './SocialShareModal.scss';
import Button from '../Common/Button';

const getMessage = (url, title, hashtagsLine) => `
${url}
${title}
${hashtagsLine}
`;

const SocialShareModal = ({
  onClose,
  share,
  title = 'Your performance is scheduled!',
  subtitle = 'Share it now to get a bigger audience',
}) => {
  const { url, title: shareTitle, hashtags } = share;
  const [copied, setCopied] = useState(false);
  const hashtagsLine = useMemo(() => hashtags.map(tag => `#${tag}`).join(' '), [
    hashtags,
  ]);

  const timerRef = useRef(null);

  const copyCb = useCallback(
    () => {
      copy(url);
      setCopied(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => setCopied(false), 3000);
    },
    [url],
  );

  return (
    <>
      <div className="social-share-modal">
        <div className="social-share-modal__modal-bg" />
        <div className="social-share-modal__modal-body">
          <h3 className="social-share-modal__modal-title">{title}</h3>
          <p className="social-share-modal__modal-description">{subtitle}</p>

          <div className="social-share-modal__modal-action">
            <div className="social-share-modal__input-group">
              <FacebookShareButton
                url={url}
                quote={shareTitle}
                hashtag={hashtagsLine}
              >
                <FacebookIcon
                  size={35}
                  round
                  className="social-share-modal__share-icon"
                />
                <div className="social-share-modal__share-name">Facebook</div>
              </FacebookShareButton>{' '}
            </div>

            <div className="social-share-modal__border-line" />

            <div className="social-share-modal__input-group">
              <LinkedinShareButton
                url={url}
                title={shareTitle}
                summary={hashtagsLine}
              >
                <LinkedinIcon
                  size={35}
                  round
                  className="social-share-modal__share-icon"
                />
                <div className="social-share-modal__share-name">Linkedin</div>
              </LinkedinShareButton>{' '}
            </div>

            <div className="social-share-modal__border-line" />

            <div className="social-share-modal__input-group">
              <TwitterShareButton
                url={url}
                title={shareTitle}
                hashtags={hashtags}
              >
                <TwitterIcon
                  size={35}
                  round
                  className="social-share-modal__share-icon"
                />
                <div className="social-share-modal__share-name">Twitter </div>
              </TwitterShareButton>{' '}
            </div>

            <div className="social-share-modal__border-line" />

            <div className="social-share-modal__input-group" onClick={copyCb}>
              <img
                src={copied ? IMG.CLOCK_ICON : IMG.LINK_CHAIN_ICON}
                alt="copy link icon"
              />{' '}
              <div className="social-share-modal__share-name">
                {copied ? 'Copied' : 'Copy link'}
              </div>
            </div>

            <Button
              background="transparent"
              border="gradient"
              size="large"
              onClick={onClose}
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

SocialShareModal.propTypes = {
  share: PropTypes.object,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default memo(SocialShareModal);
