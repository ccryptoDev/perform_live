import React, { useState } from 'react';
import { string, func } from 'prop-types';

import IMG from 'app/utils/images';

import './styles.scss';

const AddBtn = ({ title, onClick, onKeyPress, ...props }) => {
  return (
    <div className="new-layer">
      <div
        className="new-product"
        onClick={onClick}
        onKeyPress={onKeyPress}
        role="button"
        tabIndex="0"
      >
        <img
          src={IMG.PRODUCT_ADD}
          className="add-btn"
          alt="add product"
        />
        <span className="text">{title}</span>
      </div>
    </div>
  )
}

AddBtn.propTypes = {
  title: string,
  onClick: func,
  onKeyPress: func,
};

export default AddBtn;
