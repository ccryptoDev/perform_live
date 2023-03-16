import React from 'react';
import { IMG } from './profile.dependencies';
import Button from '../Common/Button/Button';

const ProfileInfo = ({
  userInfo,
  type,
  handleEditProfile,
  handleFollowProfile
}) => {
  return (
    <>
      <div className="profile-info">
        <img className="profile-avatar mask" src={userInfo.imageUrl || IMG.USER} />
        <div className="detail">
          <div className="user-name">
            <h4>{ userInfo.firstName + ' ' + userInfo.lastName }</h4>
            {
              type == "otherProfile" ? 
                <button
                  className="follow-btn"
                  onClick={() => handleFollowProfile()}
                >
                  FOLLOW
                </button> : 
                <Button
                  className="edit"
                  type="primary"
                  size="medium"
                  background="transparent"
                  border="gradient"
                  fontSize="10px"
                  onClick={handleEditProfile}
                >
                  <span className="btn-title">
                    EDIT INFO
                  </span>
                </Button>
            }
            
          </div>
          <div className="user-id mt-8">
            <span>@{userInfo.tag}</span>
          </div>
          <div className="user-detail mt-16">
            { userInfo.description }
          </div>
          <div className="social-location mt-16">
            <div className="social-links">
              <img src={IMG.FACEBOOK_ICON} />
              <img src={IMG.LINKEDIN_ICON} />
              <img src={IMG.TWITTER_ICON} />
              <img src={IMG.INSTAGRAM_ICON} />
            </div>
            <div className="location">
              <img src={IMG.LOCATION} />
              <span>New York</span>
              <span>/ USA</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;