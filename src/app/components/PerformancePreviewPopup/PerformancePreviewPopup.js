import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import IMG from 'app/utils/images';
import Modal from '../Common/Modal/Modal';

import './PerformancePreviewPopup.scss';
import useApi from '../../hooks/api';

const PerformancePreviewPopup = props => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const { performanceData, onClose } = props;

  const handleVideoPlay = e => {
    e.stopPropagation();
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
        videoRef.current.ontimeupdate = () => {
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

  const handleCloseModal = e => {
    e.stopPropagation();
    onClose();
  };
  // fetch the videoPreview url
  const { getPerformanceIdIdPreview } = useApi('performer');
  useQuery(
    ['performancePreview', performanceData.id],
    () => getPerformanceIdIdPreview(performanceData.id),
    {
      onSuccess: videoData => {
        setVideoUrl(videoData.videoUrl);
      },
    },
  );

  return (
    <Modal
      isModalOpen
      className="videoPreview__modal"
      closeModal={handleCloseModal}
      closeOnOuterClick
    >
      <div className="preview-container" onClick={e => e.stopPropagation()}>
        <div className="close">
          <img
            src={IMG.MODAL_CLOSE}
            className="close-icon"
            alt="close icon"
            onClick={handleCloseModal}
            role="none"
          />
        </div>
        {performanceData.coverUrl &&
          !isPlaying && (
            <img
              src={performanceData.coverUrl}
              alt="Performance Cover"
              className="coverImg"
            />
          )}
        {videoUrl && (
          <>
            <video
              src={videoUrl}
              className="preview-video"
              ref={videoRef}
              controls
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
      </div>
    </Modal>
  );
};

PerformancePreviewPopup.propTypes = {
  performanceData: PropTypes.object,
  onClose: PropTypes.func,
};

export default memo(PerformancePreviewPopup);
