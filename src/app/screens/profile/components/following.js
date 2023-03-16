import React, { useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import DiscoverIcon from '../../../../assets/svg/profile/discover.svg';
import FollowerComponent from './followerComponent';
import Button from '../../../components/Common/Button/Button';

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
                type={props.type}
              />
            ))}
          </div>
        ): (
          <div className="no-followers">
            <h4>You aren’t following anyone yet</h4>
            {
              props.type != "otherProfile" && <>
                <p>Discover & follow other performers whose content you love!</p>
                <Button
                  onClick={() => history.push('/')}
                >
                  <img src={DiscoverIcon} alt="browser performances" />
                  browse perfomances
                </Button>
              </>
            }
          </div>
        )}
      </div>
    </>
  );
};

Followings.propTypes = {
  followings: PropTypes.array,
  getFollowings: PropTypes.func,
  toggleFollowById: PropTypes.func,
  type: PropTypes.string,
}

export default memo(Followings);