/**
 *
 * ShareBarSmall
 *
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import ShareButtonSmall from '../ShareButtonSmall';
import Block from '../Block/Block';

const getMessage = (url, title, hashtagsLine) => `
${url}
${title}
${hashtagsLine}
`;

export const ShareBarSmall = ({ url, title, hashtags, performanceData }) => {
  const hashtagsLine = useMemo(() => hashtags.map(tag => `#${tag}`).join(' '), [
    hashtags,
  ]);
  const timerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyCb = useCallback(
    () => {
      copy(getMessage(url, title, hashtagsLine));
      setCopied(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => setCopied(false), 3000);
    },
    [url, title, hashtagsLine],
  );
  return (
    <>
      <FacebookShareButton url={url} quote={title} hashtag={hashtagsLine}>
        <ShareButtonSmall>facebook</ShareButtonSmall>
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={title} summary={hashtagsLine}>
        <ShareButtonSmall>linkedin</ShareButtonSmall>
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title} hashtags={hashtags}>
        <ShareButtonSmall>twitter</ShareButtonSmall>
      </TwitterShareButton>
      <ShareButtonSmall onClick={copyCb} withIcon={!copied}>
        {copied ? 'Copied!' : 'Copy link'}
      </ShareButtonSmall>
      {
        performanceData && (<Block 
          userInfo={performanceData.performer}
          values={['Report']}
          direction="left"
          where="user"
        />)
      }
    </>
  );
};

ShareBarSmall.propTypes = {
  hashtags: PropTypes.array,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default ShareBarSmall;
