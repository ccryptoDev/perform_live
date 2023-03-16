import { throttle } from 'lodash';
import React, { useCallback, useEffect, useState, memo, useRef } from 'react';
import uuid from 'react-uuid';
import { firebaseClient } from '../../../../utils/firebase';
import { PerformAgoraConstants } from '../../performAgora.constants';
import { IMG } from '../../screens/performer/performer.dependencies';
import useReactionAction from '../hooks/use-reaction-action';
import './reactions.scss';
const RenderReaction = memo(props => (
  <>
    <div className="activate">
      <span className="reaction red-heart">
        <img src={IMG.RED_HEART} alt="reaction" />
      </span>
    </div>
    <div className="activate">
      <span className="reaction1 red-heart">
        <img src={IMG.RED_HEART} alt="reaction" />
      </span>
    </div>
    {props.index % 3 === 0 && (
      <div className="activate">
        <span className="reaction2 red-heart">
          <img src={IMG.RED_HEART} alt="reaction" />
        </span>
      </div>
    )}
  </>
));

const DisplayReaction = ({ listenToReactionEvents = true }) => {
  const [triggeredReactions, setTriggeredReactions] = useState([]);
  const { onReacted } = useReactionAction();
  const messageFromChannel = `channel_events/${
    window.perform.eventChannelName
  }/channelMessage`;

  const intervalRef = useRef(null);

  // Subscribe to channel_event/channelMessage Table
  useEffect(
    () => {
      if (!listenToReactionEvents) {
        return;
      }
      registerCallbacks();
      firebaseClient.getDataRef(messageFromChannel);
      return () => {
        unregisterCallbacks();
        clearInterval(intervalRef.current);
      };
    },
    [listenToReactionEvents],
  );

  const registerCallbacks = () => {
    firebaseClient._emitter.on('child_added', onChildAdded);
  };

  const unregisterCallbacks = () => {
    if (!firebaseClient) {
      return;
    }
    firebaseClient._emitter.off('child_added', onChildAdded);
  };

  const onChildAdded = throttle(data => {
    if (data.type === messageFromChannel) {
      const { value } = data;
      if (
        value.messageType ===
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.LIKED_PERFORMANCE
      ) {
        setTriggeredReactions(reactions => [...reactions, uuid()]);

        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            setTriggeredReactions(reactions => {
              // reactions.splice(0, 1);
              if (!reactions.length) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              return [...reactions];
            });
          }, 2000);
        }
      }
    }
  }, 100);

  const renderReaction = useCallback(
    (id, index) => <RenderReaction key={id} index={index} />,
    [],
  );

  return <>{triggeredReactions.map(renderReaction)}</>;
};

export default DisplayReaction;
