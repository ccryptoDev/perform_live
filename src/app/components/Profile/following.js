import React, { useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { IMG } from './profile.dependencies';
import FollowerComponent from './followerComponent';
import Button from '../Common/Button/Button';

const Followings = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.getFollowings();
  }, []);
  return (
    <>
      <div className="followers">
        { props.followings.length > 0 ? (
          <div className="followerinfo-lists">
            { props.followings.map((follower, index) => (
              <FollowerComponent
                key={index}
                follower={follower}
                toggleFollow={props.toggleFollowById}
              />
            ))}
          </div>
        ): (
          <div className="no-followers">
            <h4>You aren’t following anyone yet</h4>
            <p>Discover & follow other performers whose content you love!</p>
            <Button
              onClick={() => history.push('/')}
            >
              <img src={IMG.DiscoverIcon} alt="browser performances" />
              browse perfomances
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

Followings.propTypes = {
  followings: PropTypes.array,
  getFollowings: PropTypes.func,
  toggleFollowById: PropTypes.func
}

export default memo(Followings);