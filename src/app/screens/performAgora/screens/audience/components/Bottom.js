import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import AppConstants from 'app/app.constants.json';
import { IMG } from '../audience.dependencies';
import '../../../../../styles/content.scss';
import { setPerformanceInfo } from '../../../../../state/app.actions';
import FullScreen from '../../../components/FullScreen/FullScreen';
import { Events } from '../../../../../utils/perform';
import HeartReaction from '../../../components/Reactions/heart-reaction';
import DisplayReaction from '../../../components/Reactions/displayReaction';

const Bottom = ({ fullScreenToggle, onGiftClick }) => {
  const [hasMyStageStream, setHasMyStageStream] = React.useState(false);
  const [isAudioOn, setAudioOn] = React.useState(true);
  const [isVideoOn, setVideoOn] = React.useState(true);

  const dispatch = useDispatch();

  const { giftEnabled, state: performanceState } = useSelector(
    state => state.performagora.performanceData,
  );

  const isMutedAsAudience = useSelector(state =>
    get(
      state.global.performanceInfo,
      'isMutedAsAudience',
      performanceState !== AppConstants.PERFORMANCE_STATUS.LIVE,
    ),
  );

  const userId = useSelector(state =>
    get(state.global.userInfo, 'userId', null),
  );

  const streamsUpdate = React.useCallback(
    () => {
      const stream = window.perform
        .getBordCastRTCClient()
        .getStreams()
        .find(s => s.getId().toString() === userId.toString());

      setAudioOn(stream ? stream.isAudioOn() : true);
      setVideoOn(stream ? stream.isVideoOn() : true);
      setHasMyStageStream(!!stream);
    },
    [userId],
  );

  const registerCallbacks = React.useCallback(
    () => {
      if (!window.perform) {
        return;
      }
      window.perform.on(Events.rtcLiveStreamAdded, streamsUpdate);
      window.perform.on(Events.rtcLiveStreamRemoved, streamsUpdate);
    },
    [streamsUpdate],
  );

  const unregisterCallbacks = React.useCallback(
    () => {
      if (!window.perform) {
        return;
      }
      window.perform.off(Events.rtcLiveStreamAdded, streamsUpdate);
      window.perform.off(Events.rtcLiveStreamRemoved, streamsUpdate);
    },
    [streamsUpdate],
  );

  React.useEffect(
    () => {
      registerCallbacks();
      return () => {
        unregisterCallbacks();
      };
    },
    [registerCallbacks, unregisterCallbacks],
  );

  const getMyStageStream = React.useCallback(
    () =>
      window.perform.bordCastRTCClient
        ? window.perform.bordCastRTCClient
            .getStreams()
            .find(stream => stream.getId().toString() === userId.toString())
        : null,
    [userId],
  );

  const onVolumeToggle = React.useCallback(
    () => {
      dispatch(
        setPerformanceInfo({
          isMutedAsAudience: !isMutedAsAudience,
        }),
      );
    },
    [dispatch, isMutedAsAudience],
  );

  const onMicroToggle = React.useCallback(
    () => {
      const stream = getMyStageStream();
      if (stream) {
        stream[isAudioOn ? 'muteAudio' : 'unmuteAudio']();
        setAudioOn(!isAudioOn);
      }
    },
    [hasMyStageStream, isAudioOn],
  );
  const onCameraToggle = React.useCallback(
    () => {
      const stream = getMyStageStream();
      if (stream) {
        stream[isVideoOn ? 'muteVideo' : 'unmuteVideo']();
        setVideoOn(!isVideoOn);
      }
    },
    [hasMyStageStream, isVideoOn],
  );

  return (
    <>
      <div
        className={
          fullScreenToggle ? 'perform-bottom active' : 'perform-bottom'
        }
      >
        <div className="flex-row">
          <FullScreen />
          <button className="volumn" onClick={onVolumeToggle} type="button">
            <img
              className="volumn-icon"
              src={isMutedAsAudience ? IMG.SPEAKEROFF : IMG.SPEAKERHIGH}
              alt="volumn icon"
            />
          </button>
        </div>

        {hasMyStageStream && (
          <div className="audience-screen__bottom-content">
            <button
              onClick={onMicroToggle}
              type="button"
              className="audience-screen__bottom-button"
            >
              <img
                src={isAudioOn ? IMG.AUDI_MIC_ON : IMG.AUDI_MIC_OFF}
                alt="Toggle microphone"
              />
            </button>
            <button
              onClick={onCameraToggle}
              type="button"
              className="audience-screen__bottom-button"
            >
              <img
                src={isVideoOn ? IMG.AUDI_CAMERA_ON : IMG.AUDI_CAMERA_OFF}
                alt="Toggle camera"
              />
            </button>
          </div>
        )}
        <HeartReaction onGiftClick={onGiftClick} giftEnabled={giftEnabled} />
        <div className="reaction-box">
          <DisplayReaction listenToReactionEvents />
        </div>
      </div>
    </>
  );
};

export default Bottom;
