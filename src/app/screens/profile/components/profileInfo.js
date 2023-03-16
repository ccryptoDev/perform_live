import React, { useState } from 'react';
import Button from '../../../components/Common/Button';
import Block from '../../../components/Block/Block';
import { IMG } from '../profile.dependencies';
import ShareProfile from '../../../components/Block/Common/ShareProfile';
import { getUserName } from '../../../utils/getUserName';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import Instagram from './Instagram.svg';


const values = ['Share profile', 'Report user', 'Block user'];

const ProfileInfo = ({
  type,
  userInfo,
  handleFollow,
  handleEditProfile,
  followStatus,
}) => {
  const [openShareDialog, setOpenShareDialog] = useState(false);

  const handleShareProfile = () => {
    setOpenShareDialog(true);
  };
  return (
    <>
      <div className="profile-info">
        <img
          className="profile-avatar mask"
          src={userInfo.imageUrl ? userInfo.imageUrl : IMG.USER_BLANK_AVATAR}
          alt="avatar"
        />
        <div className="detail">
          <div className="user-name">
            <h4>{getUserName(userInfo)}</h4>
            {type == 'myProfile' ? (
              <Button
                className="edit"
                background="transparent"
                border="gradient"
                fontSize="10px"
                onClick={handleEditProfile}
              >
                <span className="btn-title">EDIT</span>
              </Button>
            ) : (
              <>
                <Button
                  className="follow-btn"
                  type="primary"
                  size="medium"
                  background={!followStatus ? 'blue' : 'pink'}
                  onClick={() => handleFollow(!followStatus)}
                >
                  {!followStatus ? 'Follow' : 'UnFollow'}
                </Button>
                <Block
                  userInfo={userInfo}
                  values={values}
                  direction="left"
                  handleShareProfile={handleShareProfile}
                />
              </>
            )}
          </div>
          <div className="user-id mt-8">
            <span>@{userInfo.tag}</span>
          </div>
          <div className="user-detail mt-16">{userInfo.description}</div>
          <div className="social-location mt-16">
            <div className="social-links">
              {userInfo.facebook && (
                <div className="icon-container">
                  <FacebookIcon size={24} round className="share-icon" onClick={() => {
                    window.open(userInfo.facebook, '_blank');
                  }} />
                </div>
              )}
              {userInfo.linkedIn && (
                <div className="icon-container">
                  <LinkedinIcon size={24} round className="share-icon" onClick={() => {
                    window.open(userInfo.linkedIn, '_blank');
                  }} />
                </div>
              )}
              {userInfo.twitter && (
                <div className="icon-container">
                  <TwitterIcon size={24} round className="share-icon" onClick={() => {
                    window.open(userInfo.twitter, '_blank');
                  }} />
                </div>
              )}
              {userInfo.instagram && (
                <img
                  src={Instagram}
                  onClick={() => {
                    window.open(userInfo.instagram, '_blank');
                  }}
                />
              )}
            </div>
            {userInfo.city &&
              userInfo.country && (
                <div className="location">
                  <img src={IMG.LOCATION} />
                  <span>{userInfo.city}</span>
                  <span>/ {userInfo.country}</span>
                </div>
              )}
          </div>
        </div>
      </div>
      <ShareProfile
        isOpen={openShareDialog}
        userInfo={userInfo}
        confirmCallBack={() => setOpenShareDialog(false)}
        cancelCallBack={() => setOpenShareDialog(false)}
      />
    </>
  );
};

export default ProfileInfo;
