import React from 'react';
import PropTypes from 'prop-types';
import PlusIcon from './plus.svg';
import Button from '../Common/Button/Button';
import './EmptyState.scss';

function EmptyState({
  onClick,
  buttonText,
  title,
  subtitle,
  btnIcon = PlusIcon,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__title">{title}</div>
      <div className="empty-state__sub">{subtitle}</div>

      <Button className="empty-state__add-product" onClick={onClick}>
        <img className="products__add-product-image" src={btnIcon} alt="icon" />
        {buttonText}
      </Button>
    </div>
  );
}

EmptyState.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default EmptyState;
