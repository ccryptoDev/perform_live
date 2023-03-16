import React, { useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import '../../../../../../styles/sidebar.scss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { trim } from 'lodash';

import AppConstants from 'app/app.constants.json';
import ChatList from '../../../../components/ChatList';
import { IMG } from '../../audience.dependencies';
import { firebaseClient } from '../../../../../../utils/firebase';
import {
  setJoinStageStatus,
  setStagePresence,
  setSidebarView,
} from '../../state/audience.actions';
import { getFullName } from '../../../../../../utils/common';
import { firebaseUtils } from '../../../../../../utils/firebaseUtils';
import EmojiPicker from '../../../../components/EmojiPicker/EmojiPicker';
import ProductsAudienceView from '../../../../../productManagement/components/productsViewLayouts/ProductsAudienceView';
import GOSRow from './GOS/GOSRow/GOSRow';

function MainSideBarView({
  isExpand,
  focusedProducts,
  setFocusedProducts,
  performanceProducts,
  addProductToCart,
}) {
  const [message, setMessage] = React.useState('');
  const userInfo = useSelector(state => state.global.userInfo);
  const joinStageStatus = useSelector(state => state.audience.joinStage);
  // const history = useHistory();
  // const { id } = useParams();
  const inputCommentRef = useRef();
  const performAgoraState = useSelector(state => state.performagora);
  const { performanceData, allowedToJoinStage } = performAgoraState;
  const child = `channel_users/${performanceData.channelName}`;

  const dispatch = useDispatch();

  const handleMessage = e => {
    setMessage(e.target.value);
  };

  const joinStage = () => {
    const { stageEnabled, stagePurchase } = performanceData;
    if (!stageEnabled) return;

    if (+stagePurchase.price) {
      dispatch(setSidebarView('payJoinStage'));
    } else {
      dispatch(setJoinStageStatus({ status: 'joinRequested' }));
      firebaseUtils.joinStage(performanceData.performer.id, userInfo);
      dispatch(setSidebarView('gosWaitingRoom'));
    }
  };

  const leaveStage = () => {
    dispatch(setStagePresence({ state: 'left' }));
    dispatch(setJoinStageStatus({ status: '' }));
  };

  const channelChatRef = `channel_chat/${performanceData.channelName}`;

  const sendMessage = e => {
    e.preventDefault();
    if (trim(message)) {
      setShowEmoji(false);
      const data = {
        id: uuid(),
        messageText: message,
        sender: {
          id: userInfo.userId,
          performerId: userInfo.id,
          displayName: getFullName(userInfo.firstName, userInfo.lastName),
          profileImageUrl: userInfo.imageUrl || '',
        },
        timeStamp: moment()
          .utc()
          .format(),
      };
      firebaseClient.pushData(channelChatRef, data);
      setMessage('');
    }
  };

  const [showMore, setShowMore] = React.useState(true);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const onEmojiClick = emoji => {
    const updatedComment = message + emoji.native;
    setMessage(updatedComment);
    inputCommentRef.current.focus();
  };

  const handleEmojiShow = () => {
    setShowEmoji(true);
  };

  const [audience, setAudience] = React.useState({});

  useEffect(() => {
    let saveAudience = true;
    registerCallbacks();
    firebaseClient.getDataOnce(child, data => {
      if (data.value && saveAudience) {
        updateAudienceList(data.value);
      }
    });

    return () => {
      saveAudience = false;
      unregisterCallbacks();
    };
  }, []);

  const registerCallbacks = () => {
    firebaseClient._emitter.on('value', onValue);
  };

  const unregisterCallbacks = () => {
    if (!firebaseClient) {
      return;
    }
    firebaseClient._emitter.off('value', onValue);
  };

  const onValue = data => {
    if (data.type == child && data.value) {
      updateAudienceList(data.value);
    }
  };

  const updateAudienceList = audienceListFB => {
    // remove duplicate
    const audienceList = audience;
    Object.keys(audienceListFB).map(key => {
      if (
        audienceListFB[key].isCurrentlyWatching &&
        !audienceListFB[key].isUserBlockedFromPerformance
      ) {
        audienceList[audienceListFB[key].id] = audienceListFB[key];
      } else {
        delete audienceList[audienceListFB[key].id];
      }
    });

    setAudience({ ...audienceList });
  };

  return (
    <>
      <ProductsAudienceView
        productList={performanceProducts}
        handleShowMore={setShowMore}
        focusedProducts={focusedProducts}
        addProductToCart={addProductToCart}
      />
      <div className={showMore ? 'bottom-sidebar' : 'bottom-sidebar active'}>
        <div className={showMore ? 'chat-body' : 'chat-body active'}>
          <ChatList />
        </div>

        <div className="chat-footer">
          <div className="footer-body">
            <div className={showMore ? 'chat-input' : 'chat-input active'}>
              <div className="chat-emotical" onClick={handleEmojiShow}>
                <img className="emotical" src={IMG.SMILE} alt="emotical" />
              </div>
              <form className="chat-form" onSubmit={sendMessage}>
                <input
                  className="chatting-text"
                  size="33"
                  placeholder="Type a message"
                  value={message}
                  onChange={handleMessage}
                  ref={inputCommentRef}
                />
                <div className="chat-action">
                  <button className="chat-submit-btn">
                    <img
                      className="chat-send"
                      src={IMG.CHAT_SEND_ICON}
                      alt="send"
                    />
                  </button>
                </div>
                <EmojiPicker
                  showEmoji={showEmoji}
                  onEmojiClick={onEmojiClick}
                  onHide={() => setShowEmoji(false)}
                />
              </form>
            </div>

            {performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE &&
              performanceData.stageEnabled && (
                <GOSRow
                  performanceData={performanceData}
                  joinStageStatus={joinStageStatus}
                  allowedToJoinStage={allowedToJoinStage}
                  joinStage={joinStage}
                  leaveStage={leaveStage}
                />
              )}
            <div className="border-line" />
            <div className="chatting-users">
              <div
                className={
                  audience.length < 8
                    ? 'avatar-group'
                    : 'avatar-group big-audience'
                }
              >
                {Object.values(audience).map(
                  (user, index) =>
                    index < 10 && (
                      <img
                        className="user-avatars margin-left-0"
                        src={user.profileImageUrl || IMG.USER}
                        alt="user1"
                        key={user.id}
                      />
                    ),
                )}
                {Object.keys(audience).length > 10 && (
                  <span className="user-avatars user-avatars-count margin-left-0">
                    +{Object.keys(audience).length - 10}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSideBarView;
