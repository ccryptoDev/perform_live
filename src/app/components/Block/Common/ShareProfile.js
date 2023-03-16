import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '../../Common/Button/Button';
import LabeledTextArea from '../../LabeledTextArea/LabeledTextArea';
import './ShareProfile.scss';
import {
   FacebookShareLink,
   LinkedinShareLink,
   TwitterShareLink,
   CopyLink,
} from '../../SocialShareLink/components';

const ShareProfile = props => {
   const {
      isOpen=false,
      userInfo,
      confirmCallBack,
      cancelCallBack
   } = props;
   const [description, setDescription] = useState();
   const url = `https://web-dev.performlive.live/otherprofile?id=${userInfo.id}`;
   console.log(url);
   return (
      <>
         {isOpen && (
            <div className="share-profile-modal">
               <div className="modal-bg" />
               <div className="modal-profile-body">
                  <h3 className="modal-title">Share to...</h3>
                  <span className="modal-subTitle">
                     Share this profile with your friends!
                  </span>
                  <div className="modal-social-body">
                     <FacebookShareLink url={url} size={30} />
                     <LinkedinShareLink url={url} size={30} />
                     <TwitterShareLink url={url} size={30} />
                  </div>
                  <div className="modal-message">
                     <LabeledTextArea
                        name="message"
                        label="Your message"
                        placeholder=""
                        maxLength="400"
                        useShadow
                        rows="3"
                        value={description}
                        onChange={event => {
                           setDescription(event.target.value);
                        }}
                     />
                  </div>
                  <div className="modal-action">
                     <Button
                        className="action-btn"
                        type="primary"
                        size="large"
                        background="transparent"
                        border="gradient"
                        onClick={cancelCallBack}
                     >
                        {'Close'}
                     </Button>
                     <Button
                        className="action-btn"
                        type="primary"
                        size="large"
                        background="gradient"
                        onClick={confirmCallBack}
                     >
                        {'Done'}
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

ShareProfile.propsType = {
   isOpen: PropTypes.bool,
   userInfo: PropTypes.object,
   confirmCallBack: PropTypes.func,
   cancelCallBack: PropTypes.func,
}

export default ShareProfile;