import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import AppConstants from 'app/app.constants.json';
import GuestStream from './GuestStream';
import PerformerStream from './PerformerStream';
import { Events } from '../../../../utils/perform';
import '../../../../styles/content.scss';
import useAudience from '../../../performAgora/hooks/useAudience';
import { AudienceConstants } from '../../../performAgora/screens/audience/audience.constants';

const setAudioMuted = (streamId, isMuted) => {
  const node = document.getElementById(`audio${streamId}`);
  if (node) {
    node.muted = isMuted;
  }
};

export default memo(({ fullScreenToggle }) => {
  const [streams, updateStreams] = useState([]);
  const [streamVideoState, setVideoState] = useState({});
  const [performerStream, setPerformerStreams] = useState(null);
  const globalData = useSelector(state => state);

  const { performanceData } = globalData.agorarecording;
  const audienceHook = useAudience();

  useEffect(
    () => {
      registerCallbacks();
      return () => {
        streams.forEach(stream => {
          stream.stop();
          stream.close();
        });
        unregisterCallbacks();
      };
    },

    [],
  );

  const streamsUpdate = useCallback(() => {
    const client = window.perform.getBordCastRTCClient();
    // check if performer left the channel, If Yes, then auto left audience as well
    if (client.leftUsers.indexOf(performanceData.performer.id) !== -1) {
      audienceHook.leftPerformance();
      return;
    }
    const newStreams = [...client.getStreams()];
    if (!newStreams.length) {
      setPerformerStreams(null);
    }

    newStreams.forEach(stream => {
      // setAudioMuted(stream.getId(), isMutedAsAudience);
      if (stream.getId() === performanceData.performer.id) {
        setPerformerStreams(stream);
      }
    });

    updateStreams(newStreams);

    // reset remote video state
    setVideoState({});
  }, []);

  const videoStateUpdate = evt => {
    setVideoState(prevState => {
      prevState[evt.uid] = evt.type === 'mute-video';
      return { ...prevState };
    });
  };

  const registerCallbacks = useCallback(
    () => {
      if (!window.perform) {
        return;
      }

      console.log('register callback');

      window.perform.on(Events.rtcLiveStreamAdded, streamsUpdate);
      window.perform.on(Events.rtcLiveStreamRemoved, streamsUpdate);
      window.perform.on(Events.rtcLiveStreamMuted, videoStateUpdate);
      window.perform.on(Events.rtcLiveStreamUnMuted, videoStateUpdate);
    },
    [streamsUpdate, videoStateUpdate],
  );

  const unregisterCallbacks = useCallback(
    () => {
      if (!window.perform) {
        return;
      }
      console.log('UNREGISTER callback');

      window.perform.off(Events.rtcLiveStreamAdded, streamsUpdate);
      window.perform.off(Events.rtcLiveStreamRemoved, streamsUpdate);
      window.perform.off(Events.rtcLiveStreamMuted, videoStateUpdate);
      window.perform.off(Events.rtcLiveStreamUnMuted, videoStateUpdate);
    },
    [streamsUpdate, videoStateUpdate],
  );

  // useEffect(
  //   () => {
  //     streams.forEach(stream => {
  //       setAudioMuted(stream.getId(), isMutedAsAudience);
  //     });
  //   },
  //   [registerCallbacks, unregisterCallbacks],
  // );

  useEffect(
    () => {
      // check for 30 sec, if there is no performer stream, then leave audience
      let intervalRef;
      if (
        performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE &&
        !window.perform.getAuthUser().isPerformer
      ) {
        intervalRef = setTimeout(
          stream => {
            if (!stream) {
              audienceHook.leftPerformance();
            }
          },
          AudienceConstants.WAIT_TIME_PERFORMER_STREAM,
          performerStream,
        );
      }

      return () => {
        clearTimeout(intervalRef);
      };
    },
    [performerStream],
  );

  const setLeaveModal = id => {
    const data = {
      state: 'left',
    };
  };

  const renderStream = stream => {
    const id = stream.getId();
    const playerId = `stream-${id}`;

    const playHandler = () => {
      if (window.perform) {
        window.perform.playStream(stream, playerId, true);
      }
      // stream.muteAudio();
    };

    const props = {
      key: { id },
      id: { id },
      playHandler,
      playerId,
      setLeaveModal,
      videoMuted:
        (typeof streamVideoState[id] !== 'undefined' &&
          streamVideoState[id] === true) ||
        false,
      ...stream,
    };

    if (id.toString() === performanceData.performer.id.toString()) {
      return <PerformerStream {...props} />;
    }

    return <GuestStream {...props} />;
  };

  return (
    <>
      <div className={fullScreenToggle ? 'request active' : 'request'}>
        <div
          className={
            streams.length > 1 ? 'request-body item-2' : 'request-body item-1'
          }
        >
          {performerStream && renderStream(performerStream)}
          {streams.map(stream => {
            if (stream.getId() !== performanceData.performer.id)
              return renderStream(stream);
          })}
        </div>
      </div>
    </>
  );
});
