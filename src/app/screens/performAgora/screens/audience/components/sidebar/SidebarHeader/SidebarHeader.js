import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from './CloseButton.svg';
import Left from './Left.svg';

const SidebarHeader = ({ onClose, title, onBack }) => {
  return (
    <div className="sidebar-cart__header">
      {onBack ? (
        <div className="cart-header__close" onClick={onBack}>
          <img src={Left} alt="back" />
        </div>
      ) : (
        <div className="sidebar-cart__header-placeholder" />
      )}

      <div className="cart-header__title h3">{title}</div>

      {onClose ? (
        <div className="cart-header__close" onClick={onClose}>
          <img src={CloseButton} alt="close" />
        </div>
      ) : (
        <div className="sidebar-cart__header-placeholder" />
      )}
    </div>
  );
};

SidebarHeader.propTypes = {};

export default SidebarHeader;
