import React from 'react';
import { IMG } from './profile.dependencies';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FollowerComponent = ({
  follower,
  toggleFollow
}) => {
  const { id, followedByMe, performer, firstName, lastName, totalPerformances } = follower;
  return (
    <div className="follower-info">
      <div className="card">
        <img src={IMG.USER} />
        <div className="personal-info">
          <p>
            {
              performer ?
              `${performer.firstName} ${performer.lastName}`
              :`${firstName} ${lastName}`
            }
          </p>
          <span>{totalPerformances} Performances</span>
        </div>
      </div>
      <div className="card-action">
        <div
          className={classNames('follow', { reversed: followedByMe === true })}
          onClick={() => toggleFollow(performer ? performer.id : id)}
        >
          {followedByMe === false?'Follow':'UnFollow'}
        </div>
      </div>
    </div>
  );
};

FollowerComponent.propTypes = {
  follower: PropTypes.object,
  toggleFollow: PropTypes.func
}

export default FollowerComponent;