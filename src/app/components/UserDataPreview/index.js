import React from 'react';
import { shape, func, string } from 'prop-types';

import User from 'assets/svg/user.svg';
import Email from 'assets/svg/email.svg';
import Phone from 'assets/svg/phone.svg';
import Pointer from 'assets/svg/pointer.svg';
import Pencil from 'assets/svg/pencil.svg';
import { composeAddressStr } from 'app/utils';

import './styles.scss';

const UserDataPreview = ({ data = {}, onEdit = () => null }) => {
  const { fullname = '', phone = '', email = '' } = data;
  const address = composeAddressStr(data);

  const icons = {
    edit: Pencil,
    name: User,
    address: Pointer,
    phone: Phone,
    email: Email,
  };

  return (
    <div className="userdatapreview-container">
      {(fullname || address || phone || email) && (
        <div className="edit-btnicon-container" onClick={onEdit}>
          <img src={icons.edit} alt="" />
        </div>
      )}
      {fullname && (
        <div className="input-group">
          <div className="input-group-prepend">
            <img src={icons.name} alt="" />
          </div>
          <input
            className="form-control"
            disabled="disabled"
            value={fullname}
          />
        </div>
      )}
      {address && (
        <div className="input-group">
          <div className="input-group-prepend">
            <img src={icons.address} alt="" />
          </div>
          <input className="form-control" disabled="disabled" value={address} />
        </div>
      )}
      {phone && (
        <div className="input-group">
          <div className="input-group-prepend">
            <img src={icons.phone} alt="" />
          </div>
          <input className="form-control" disabled="disabled" value={phone} />
        </div>
      )}
      {email && (
        <div className="input-group">
          <div className="input-group-prepend">
            <img src={icons.email} alt="" />
          </div>
          <input className="form-control" disabled="disabled" value={email} />
        </div>
      )}
    </div>
  );
};

UserDataPreview.propTypes = {
  data: shape({
    name: string,
    address: string,
    phone: string,
    email: string,
  }),
  onEdit: func,
};

export default UserDataPreview;
