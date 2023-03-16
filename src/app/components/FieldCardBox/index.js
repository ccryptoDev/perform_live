import React from 'react';
import { func, string } from 'prop-types';

import Trash from 'assets/svg/trash.svg';
import Card from 'assets/svg/card.svg';

import './styles.scss';

const FieldCardBox = ({ icon, value = `••••`, onEdit = () => null }) => (
  <div className="fieldcardbox-container">
    <div className="input-group">
      <div className="input-group-prepend">
        <img src={icon || Card} alt="" />
      </div>
      <div className="form-control">{`•••• •••• •••• ${value || `••••`}`}</div>
    </div>
    <div className="edit-btnicon-container" onClick={onEdit}>
      <img src={Trash} alt="" />
    </div>
  </div>
);

FieldCardBox.propTypes = {
  icon: string,
  value: string,
  onEdit: func,
};

export default FieldCardBox;
