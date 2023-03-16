/**
 *
 * ShareButtonSmall
 *
 */

import React from 'react';
import IMG from 'app/utils/images';
import PropTypes from 'prop-types';

const ShareButtonSmall = ({ children, onClick, withIcon = true }) => (
  <div
    type="button"
    className="button share"
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex="0"
  >
    <span className="button__border" />
    <span className="button__overlay" />
    <span className="button__label flex-row">
      {withIcon && <img src={IMG.AUDI_SHARE} alt="" />}
      {children}
    </span>
  </div>
);

ShareButtonSmall.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default ShareButtonSmall;
