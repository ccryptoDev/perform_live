// import React, { useEffect, useRef } from 'react';
// import uuid from 'react-uuid';
// import '../../../../../../styles/sidebar.scss';
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { trim } from 'lodash';

// import AppConstants from 'app/app.constants.json';
// import { useHistory, useParams } from 'react-router-dom';
// import ChatList from '../../../../components/ChatList';
// import { IMG } from '../../audience.dependencies';
// import { firebaseClient } from '../../../../../../utils/firebase';
// import {
//   setJoinStageStatus,
//   setStagePresence,
//   setInviteStageStatus,
//   setPerformancePresence,
// } from '../../state/audience.actions';
// import { PerformAgoraConstants } from '../../../../performAgora.constants';
// import { getPerformanceInfo } from '../../../../state/performAgora.actions';
// import { getPerformanceProducts } from '../../../../../productManagement/state/productManagement.actions';
// import { getFullName } from '../../../../../../utils/common';
// import ProductManagement from '../../../../../productManagement/productManagement';
// import { firebaseUtils } from '../../../../../../utils/firebaseUtils';
// import EmojiPicker from '../../../../components/EmojiPicker/EmojiPicker';
// import useAudience from '../../../../hooks/useAudience';
// import ProductsAudienceView from '../../../../../productManagement/components/productsViewLayouts/ProductsAudienceView';
// const { FIREBASE_MESSAGE_TYPES } = PerformAgoraConstants;

// function MainSideBarView({
//   isExpand,
//   focusedProducts,
//   setFocusedProducts,
//   performanceProducts,
//   addProductToCart,
// }) {
//   const [message, setMessage] = React.useState('');
//   const userInfo = useSelector(state => state.global.userInfo);
//   const joinStageStatus = useSelector(state => state.audience.joinStage);
//   const history = useHistory();
//   const { id } = useParams();
//   const focusedProductRef = useRef([]); // this is we had to take so that we have updated value in firebase callback
//   const inputCommentRef = useRef();
//   const performAgoraState = useSelector(state => state.performagora);
//   const { performanceData, allowedToJoinStage } = performAgoraState;

//   const dispatch = useDispatch();
//   const audienceHook = useAudience();
//   const timeStamp = moment()
//     .utc()
//     .format();
//   const messageFromPeer = `channel_events/${
//     performanceData.channelName
//   }/messageFromPeer/${userInfo.userId}`;
//   const messageFromChannel = `channel_events/${
//     performanceData.channelName
//   }/channelMessage`;
//   const channelChatRef = `channel_chat/${performanceData.channelName}`;

//   const onChannelEvent = React.useCallback(
//     data => {
//       if (
//         data.value.timeStamp > timeStamp &&
//         data.value.messageType === FIREBASE_MESSAGE_TYPES.PERFORMANCE_ENDED
//       ) {
//         audienceHook.leftPerformance();
//       }
//     },
//     [performanceData],
//   );

//   // getting already focused products from Firebase

//   useEffect(() => {
//     const channelStateRef = `channel_state/${
//       firebaseClient._channel
//     }/focused_products`;
//     firebaseClient.getDataOnce(channelStateRef, data => {
//       const products = (data.value && [...data.value]) || [];
//       setFocusedProducts(products);
//       focusedProductRef.current = products;
//     });
//   }, []);

//   useEffect(
//     () => {
//       // firebaseClient.getDataRef(channelEventsRef);
//       firebaseClient._emitter.on('child_added', onChannelEvent);
//       return () => {
//         // firebaseClient.getDataRef(channelEventsRef);
//         firebaseClient._emitter.off('child_added', onChannelEvent);
//       };
//     },
//     [onChannelEvent],
//   );

//   useEffect(() => {
//     firebaseClient.getDataRef(messageFromPeer);
//     firebaseClient.getDataRef(messageFromChannel);
//     registerCallbacks();
//     return () => {
//       unregisterCallbacks();
//     };
//   }, []);

//   const registerCallbacks = () => {
//     firebaseClient._emitter.on('child_added', onChildAdded);
//   };

//   const unregisterCallbacks = () => {
//     if (!firebaseClient) {
//       return;
//     }
//     firebaseClient._emitter.off('child_added', onChildAdded);
//   };

//   const onChildAdded = async data => {
//     if (data.type === messageFromPeer) {
//       const { value } = data;
//       if (
//         value.messageType ==
//         FIREBASE_MESSAGE_TYPES.PERFORMER_PROCESS_JOIN_REQUEST
//       ) {
//         if (value.timeStamp > timeStamp) {
//           if (value.messageData.isRequestApproved) {
//             // window.perform.publish
//             const client = window.perform.getBordCastRTCClient();
//             client.createLocalStream(
//               {
//                 attendeeMode: 'video',
//                 videoProfile: '480p_1',
//               },
//               () => {
//                 client.publishStream();
//               },
//             );

//             await firebaseUtils.handleStageUser(userInfo, 'add');
//             dispatch(setJoinStageStatus({ status: 'joined' }));
//           } else {
//             dispatch(setJoinStageStatus({ status: 'rejected' }));
//           }
//         }
//       }

//       if (
//         value.messageType == FIREBASE_MESSAGE_TYPES.AUDIENCE_KICKED_FROM_STAGE
//       ) {
//         if (value.timeStamp > timeStamp) {
//           const client = window.perform.getBordCastRTCClient();
//           client.unpublishStream();

//           const data = {
//             state: 'removed',
//           };
//           dispatch(setStagePresence(data));
//           dispatch(setJoinStageStatus({ status: '' }));
//         }
//       }

//       if (
//         value.messageType == FIREBASE_MESSAGE_TYPES.INVITE_AUDIENCE_TO_STAGE
//       ) {
//         if (value.timeStamp > timeStamp) {
//           const data = {
//             state: 'invited',
//           };
//           dispatch(setInviteStageStatus(data));
//         }
//       }

//       if (
//         value.messageType == FIREBASE_MESSAGE_TYPES.CANCEL_INVITE_TO_JOIN_STAGE
//       ) {
//         if (value.timeStamp > timeStamp) {
//           const data = {
//             state: '',
//           };
//           dispatch(setInviteStageStatus(data));
//         }
//       }

//       // when audience removed from performance by performer
//       if (
//         value.messageType ==
//         FIREBASE_MESSAGE_TYPES.AUDIENCE_KICKED_FROM_PERFORMANCE
//       ) {
//         if (value.messageData.timeStamp > timeStamp) {
//           const client = window.perform.getBordCastRTCClient();
//           client.unpublishStream();
//           setTimeout(() => {
//             client.leaveChannel();
//           }, 500);
//           const data = {
//             state: 'removed',
//           };
//           dispatch(setPerformancePresence(data));
//           return history.push('/');
//         }
//       }
//     } else if (data.type === messageFromChannel) {
//       const { value } = data;
//       // When a product is being focused by performer
//       if (value.messageType === FIREBASE_MESSAGE_TYPES.FOCUS_UNFOCUS_PRODUCT) {
//         if (value.timeStamp > timeStamp) {
//           // update the focused product state
//           // check if product already exist
//           const productIndex = focusedProductRef.current.indexOf(
//             value.messageData.productId,
//           );

//           if (productIndex !== -1) {
//             if (!value.messageData.isFocused) {
//               focusedProductRef.current.splice(productIndex, 1);
//             }
//           } else {
//             focusedProductRef.current.push(value.messageData.productId);
//           }

//           setFocusedProducts([...focusedProductRef.current]);
//         }
//       }

//       // When a performance goes live
//       if (value.messageType === FIREBASE_MESSAGE_TYPES.PERFORMANCE_IS_LIVE) {
//         if (value.timeStamp > timeStamp) {
//           setTimeout(() => {
//             dispatch(getPerformanceInfo({ paramsToReplace: { id } }));
//           }, 1000);
//         }
//       }

//       // When performer update his product list during live performance
//       if (value.messageType === FIREBASE_MESSAGE_TYPES.REFRESH_PRODUCT_LIST) {
//         if (value.timeStamp > timeStamp) {
//           const payload = {
//             paramsToReplace: { id },
//             queryPrams: { gallery: true },
//           };
//           dispatch(getPerformanceProducts(payload));
//         }
//       }
//     }
//   };

//   const handleMessage = e => {
//     setMessage(e.target.value);
//   };

//   const joinStage = () => {
//     const localData = {
//       status: 'joinRequested',
//     };
//     dispatch(setJoinStageStatus(localData));
//     const data = {
//       messageType: FIREBASE_MESSAGE_TYPES.REQUEST_TO_JOIN_STAGE,
//       timeStamp: moment()
//         .utc()
//         .format(),
//       requester: {
//         displayName: getFullName(userInfo.firstName, userInfo.lastName),
//         id: userInfo.userId,
//         profileImageUrl: IMG.USER,
//       },
//     };

//     firebaseClient.sendPeerMessage(performanceData.performer.id, data);
//   };

//   const leaveStage = () => {
//     const data = {
//       state: 'left',
//     };
//     dispatch(setStagePresence(data));
//     dispatch(setJoinStageStatus({ status: '' }));
//   };

//   const sendMessage = e => {
//     e.preventDefault();
//     if (trim(message)) {
//       setShowEmoji(false);
//       const data = {
//         id: uuid(),
//         messageText: message,
//         sender: {
//           id: userInfo.userId,
//           displayName: getFullName(userInfo.firstName, userInfo.lastName),
//           profileImageUrl: userInfo.imageUrl || IMG.USER,
//         },
//         timeStamp: moment()
//           .utc()
//           .format(),
//       };
//       firebaseClient.pushData(channelChatRef, data);
//       setMessage('');
//     }
//   };

//   const [showMore, setShowMore] = React.useState(true);
//   const [showEmoji, setShowEmoji] = React.useState(false);
//   const onEmojiClick = emoji => {
//     const updatedComment = message + emoji.native;
//     setMessage(updatedComment);
//     inputCommentRef.current.focus();
//   };

//   const handleEmojiShow = () => {
//     setShowEmoji(true);
//   };

//   return (
//     <>
//       <ProductsAudienceView
//         productList={performanceProducts}
//         handleShowMore={setShowMore}
//         focusedProducts={focusedProducts}
//         addProductToCart={addProductToCart}
//       />
//       <div className={showMore ? 'bottom-sidebar' : 'bottom-sidebar active'}>
//         <div className={showMore ? 'chat-body' : 'chat-body active'}>
//           <ChatList />
//         </div>
//         <div className="chat-footer">
//           <div className="footer-body">
//             <div className={showMore ? 'chat-input' : 'chat-input active'}>
//               <div className="chat-emotical" onClick={handleEmojiShow}>
//                 <img className="emotical" src={IMG.SMILE} alt="emotical" />
//               </div>
//               <form className="chat-form" onSubmit={sendMessage}>
//                 <input
//                   className="chatting-text"
//                   size="33"
//                   placeholder="Type a message"
//                   value={message}
//                   onChange={handleMessage}
//                   ref={inputCommentRef}
//                 />
//                 <div className="chat-action">
//                   <button className="chat-submit-btn">
//                     <img
//                       className="chat-send"
//                       src={IMG.CHAT_SEND_ICON}
//                       alt="send"
//                     />
//                   </button>
//                 </div>
//                 <EmojiPicker
//                   showEmoji={showEmoji}
//                   onEmojiClick={onEmojiClick}
//                   onHide={() => setShowEmoji(false)}
//                 />
//               </form>
//             </div>
//             <div className="below-nav">
//               <div className="stage-field">
//                 <div className="stage-text">
//                   {`${getFullName(
//                     performanceData.performer.firstName,
//                     performanceData.performer.lastName,
//                   )}`}{' '}
//                   on stage and ask him anything just for{' '}
//                   <span className="text">$4.99</span>
//                 </div>
//                 {performanceData.state ===
//                   AppConstants.PERFORMANCE_STATUS.LIVE && (
//                   <div className="stage-button">
//                     {joinStageStatus.status !== 'joined' && (
//                       <button
//                         className="join-btn"
//                         onClick={() => joinStage()}
//                         type="button"
//                         disabled={
//                           joinStageStatus.status === 'joinRequested' ||
//                           !allowedToJoinStage
//                         }
//                       >
//                         join stage
//                       </button>
//                     )}
//                     {joinStageStatus.status === 'joined' && (
//                       <button
//                         className="join-btn"
//                         onClick={() => leaveStage()}
//                         type="button"
//                       >
//                         Leave stage
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="border-line" />
//             <div className="chatting-users">
//               <div className="avatar-group" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MainSideBarView;
