import React, { useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import IMG from '../../../utils/images';
import Button from '../../../components/Common/Button/Button';

import FollowerComponent from './followerComponent';

const Followers = props => {
  const history = useHistory();
  useEffect(() => {
    props.getFollowers();
  }, []);

  return (
    <>
      <div className="followers">
        {props.followers.length > 0 ? (
          <div className="followerinfo-lists">
            {props.followers.map((follower, index) => (
              <FollowerComponent
                key={index}
                follower={follower}
                toggleFollow={props.toggleFollowById}
                type={props.type}
              />
            ))}
          </div>
        ) : (
          <div className="no-followers">
            <h4>No followers yet</h4>
            {props.type != 'otherProfile' && (
              <>
                <p>
                  You’ll get followers when you host a performance and when you
                  follow other performers
                </p>
                <Button
                  onClick={() =>
                    history.push('/performancescheduler?type=sale')
                  }
                >
                  <img src={IMG.PLUS_ICON} className="plus" alt="plus icon" />
                  <span>NEW PERFORMANCE</span>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

Followers.propTypes = {
  followers: PropTypes.array,
  getFollowers: PropTypes.func,
  toggleFollowById: PropTypes.func,
  type: PropTypes.string,
};

export default memo(Followers);
