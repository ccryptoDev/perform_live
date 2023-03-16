import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import AppConstants from 'app/app.constants.json';
import GuestStream from './GuestStream';
import PerformerStream from './PerformerStream';
// import RequestField from '../requestField';
import { Events } from '../../../../utils/perform';
import '../../../../styles/content.scss';
import { removeUser } from '../../screens/performer/state/performer.actions';
import {
  setJoinStageStatus,
  setStagePresence,
} from '../../screens/audience/state/audience.actions';
import { IMG } from '../../screens/performer/performer.dependencies';
import { getFullName } from '../../../../utils/common';
import { setAllowedToJoinStage } from '../../state/performAgora.actions';
import useAudience from '../../hooks/useAudience';
import { AudienceConstants } from '../../screens/audience/audience.constants';

const setAudioMuted = (streamId, isMuted) => {
  const node = document.getElementById(`audio${streamId}`);
  if (node) {
    node.muted = isMuted;
  }
};

export default memo(props => {
  const { fullScreenToggle } = props;
  const [streams, updateStreams] = useState([]);
  const [streamVideoState, setVideoState] = useState({});
  const [performerStream, setPerformerStreams] = useState(null);
  const performerState = useSelector(state => state.performer);
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const userInfo = useSelector(state => state.global.userInfo);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const audienceHook = useAudience();

  let allowedForLive = false;
  if (performerState) {
    allowedForLive = performerState.allowedForLive;
  }
  let user = {};
  if (window.perform) {
    user = window.perform.getAuthUser();
  }

  const isMutedAsAudience = useSelector(state =>
    get(
      state.global.performanceInfo,
      'isMutedAsAudience',
      performanceData.state !== AppConstants.PERFORMANCE_STATUS.LIVE,
    ),
  );

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

  useEffect(
    () => {
      if (allowedForLive) {
        const client = window.perform.getBordCastRTCClient();
        client.publishStream();
      }
    },
    [allowedForLive],
  );

  useEffect(
    () => {
      // check if performance is in upcoming status then mute/unmute will work for video preview
      if (
        videoRef.current &&
        performanceData.state === AppConstants.PERFORMANCE_STATUS.PUBLISHED
      ) {
        videoRef.current.muted = isMutedAsAudience;
      }
      // if (!isMutedAsAudience && performerStream) {
      //   performerStream.resume();
      // }
    },
    [isMutedAsAudience],
  );

  const streamsUpdate = useCallback(
    () => {
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
      const guestStreams = [];
      newStreams.forEach(stream => {
        // If I am audience then apply isMutedAsAudience Setting
        if (!window.perform.getAuthUser().isPerformer) {
          setAudioMuted(stream.getId(), isMutedAsAudience);
        }
        if (stream.getId() === performanceData.performer.id) {
          setPerformerStreams(stream);
        }
      });

      updateStreams(newStreams);

      // reset remote video state
      setVideoState({});
      // set max allowed audience 1 to join stage
      let allowedToJoinStage = true;
      if (newStreams.length === 2) {
        allowedToJoinStage = false;
      }
      dispatch(setAllowedToJoinStage(allowedToJoinStage));
    },
    [isMutedAsAudience],
  );

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

      window.perform.off(Events.rtcLiveStreamAdded, streamsUpdate);
      window.perform.off(Events.rtcLiveStreamRemoved, streamsUpdate);
      window.perform.off(Events.rtcLiveStreamMuted, videoStateUpdate);
      window.perform.off(Events.rtcLiveStreamUnMuted, videoStateUpdate);
    },
    [streamsUpdate, videoStateUpdate],
  );

  useEffect(
    () => {
      // If I am audience then apply isMutedAsAudience Setting
      if (!window.perform.getAuthUser().isPerformer) {
        streams.forEach(stream => {
          setAudioMuted(stream.getId(), isMutedAsAudience);
        });
      }
    },
    [isMutedAsAudience],
  );

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
    if (window.perform.getAuthUser().isPerformer) {
      const data = {
        state: 'remove',
        userDetials: {
          userId: id.id,
          displayName: getFullName(userInfo.firstName, userInfo.lastName),
        },
      };
      dispatch(removeUser(data));
    } else {
      const data = {
        state: 'left',
      };
      dispatch(setStagePresence(data));
      dispatch(setJoinStageStatus({ status: '' }));
    }
  };

  const renderStream = stream => {
    const id = stream.getId();
    const playerId = `stream-${id}`;

    const playHandler = () => {
      if (window.perform) {
        const id = stream.getId();
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

  const handleVideoPlay = () => {
    if (videoRef.current.paused === true) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(
    () => {
      if (videoRef.current) {
        videoRef.current.ontimeupdate = event => {
          if (videoRef.current) {
            if (
              isPlaying &&
              videoRef.current.currentTime === videoRef.current.duration
            ) {
              videoRef.current.pause();
              setIsPlaying(false);
              // videoRef.current.load();
            }
          }
        };
      }
    },
    [videoRef.current, isPlaying],
  );

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
          {!streams.length &&
            performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE && (
              <span className="info-msg">Performance is about to start!!</span>
            )}

          {/* // shwo performance perview till performance goes live */}
          {!user.isPerformer &&
            !streams.length &&
            performanceData.state ===
              AppConstants.PERFORMANCE_STATUS.PUBLISHED && (
              <>
                {performanceData.coverUrl &&
                  !isPlaying && (
                    <img
                      src={performanceData.coverUrl}
                      alt="Performance Cover"
                      className="coverImg"
                    />
                  )}
                {performanceData.videoUrl && (
                  <>
                    <video
                      src={performanceData.videoUrl}
                      className="preview-video"
                      ref={videoRef}
                      autoPlay
                      muted
                    />
                    <div className="play-button">
                      <img
                        src={!isPlaying ? IMG.PLAY_SVG : IMG.PAUSE_SVG}
                        className={!isPlaying ? 'play-icon' : 'pause-icon'}
                        alt=""
                        onClick={handleVideoPlay}
                        role="none"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          {/* {(joinStage.status == 'joinRequested' ||
            joinStage.status == 'rejected') && <RequestField />} */}
        </div>
      </div>
    </>
  );
});
