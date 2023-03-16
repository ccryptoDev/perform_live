import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import IMG from 'app/utils/images';
import '../ShareLink.scss';

const CopyLink = ({ url }) => {
  const [copied, setCopied] = React.useState(false);
  const onClickHandler = () => {
    const result = copy(url);
    setCopied(result);
  };
  return (
    <div className="share-link-wrapper">
      <button
        type="button"
        className={['share-link', copied ? 'share-link-active' : ''].join(' ')}
        onClick={onClickHandler}
      >
        <img
          src={copied ? IMG.CLOCK_ICON : IMG.LINK_CHAIN_ICON}
          alt="copy link icon"
        />
      </button>
      <div>{copied ? 'Link copied' : 'Copy link'}</div>
    </div>
  );
};

CopyLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default CopyLink;
