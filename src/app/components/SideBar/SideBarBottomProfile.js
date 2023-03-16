import React from 'react';

const SideBarBottomProfile = props => {
  const { email, name, photoUrl } = props;
  return (
    <div className="side-bottom-profile">
      <img alt="profile" src={photoUrl} className="avatar" />
      <div className="profile">
        <span className="name">{name}</span>
        <span className="email">{email}</span>
      </div>
    </div>
  );
};

export default SideBarBottomProfile;
