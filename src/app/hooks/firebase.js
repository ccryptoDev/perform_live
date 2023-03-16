import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { firebaseClient } from '../utils/firebase';

export const useFirebaseChat = (channelName, cb) => {
  const refAddress = `channel_chat/${channelName}`;
  firebaseClient.getDataRef(refAddress);

  const handler = useCallback(
    data => {
      if (data.type !== refAddress) return;
      cb(data.value);
    },
    [cb, refAddress],
  );

  const registerCallbacks = useCallback(
    () => {
      if (!firebaseClient) {
        return;
      }
      firebaseClient._emitter.on('value', handler);
    },
    [firebaseClient, handler],
  );

  const unregisterCallbacks = useCallback(
    () => {
      if (!firebaseClient) {
        return;
      }
      firebaseClient._emitter.off('value', handler);
    },
    [firebaseClient, handler],
  );

  useEffect(
    () => {
      registerCallbacks();
      firebaseClient.getDataOnce(refAddress, data => {
        if (data) {
          cb(data.value);
        }
      });

      return () => {
        unregisterCallbacks();
      };
    },
    [refAddress, cb, registerCallbacks, unregisterCallbacks, firebaseClient],
  );
};

export const useMessageFromPeer = (channelName, userId, messageType, cb) => {
  const refAddress = `channel_events/${channelName}/messageFromPeer/${userId}`;
  // const timeStamp = useSelector(state => state.performagora.timeStamp);
  const timeStamp = useMemo(() =>
    moment()
      .utc()
      .format(),
  );

  const handler = useCallback(
    data => {
      if (data.type !== refAddress) return;

      const { value } = data;
      if (value.messageType !== messageType) return;
      if (value.timeStamp >= timeStamp) {
        cb(data.value);
      }
    },
    [timeStamp],
  );

  useEffect(() => {
    firebaseClient.getDataRef(refAddress);
    firebaseClient._emitter.on('child_added', handler);
    return () => {
      if (!firebaseClient) {
        return;
      }
      firebaseClient._emitter.off('child_added', handler);
    };
  }, []);
};

export const useMessageFromChannel = (channelName, userId, messageType, cb) => {
  const refAddress = `channel_events/${channelName}/channelMessage`;

  // const timeStamp = useSelector(state => state.performagora.timeStamp);
  const timeStamp = useMemo(() =>
    moment()
      .utc()
      .format(),
  );

  const handler = useCallback(
    data => {
      if (data.type !== refAddress) return;

      const { value } = data;
      if (value.messageType !== messageType) return;
      if (value.timeStamp >= timeStamp) {
        cb(data.value);
      }
    },
    [timeStamp],
  );

  useEffect(() => {
    firebaseClient.getDataRef(refAddress);
    firebaseClient._emitter.on('child_added', handler);
    return () => {
      if (!firebaseClient) {
        return;
      }
      firebaseClient._emitter.off('child_added', handler);
    };
  }, []);
};

export const useChannelEvent = (messageType, cb) => {
  const timeStamp = useMemo(() =>
    moment()
      .utc()
      .format(),
  );

  const onChannelEvent = useCallback(
    data => {
      if (
        data.value.timeStamp > timeStamp &&
        data.value.messageType === messageType
      ) {
        cb(data.value);
      }
    },
    [cb],
  );

  useEffect(
    () => {
      firebaseClient._emitter.on('child_added', onChannelEvent);
      return () => {
        firebaseClient._emitter.off('child_added', onChannelEvent);
      };
    },
    [onChannelEvent],
  );
};
