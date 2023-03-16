import React from 'react';
import PropTypes from 'prop-types';
import IMG from 'app/utils/images';

const CardFooter = props => {
  const { 
    avatarUrl, 
    name, 
    onClickAvatar 
  } = props;
  return (
    <div className="card-footer">
      <div className="card-profile" onClick={onClickAvatar}>
        <img
          src={avatarUrl || IMG.PERFORMANCE_COVER}
          className="avatar"
          alt=""
        />
        <span className="profile-name">{name}</span>
      </div>
      {props.children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
};

export default CardFooter;
