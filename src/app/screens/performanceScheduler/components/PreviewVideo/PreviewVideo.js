import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './PreviewVideo.scss';
import { IMG } from '../../performanceScheduler.dependencies';
import Button from '../../../../components/Common/Button';
import PlaySVG from '../../../../../assets/svg/play.svg';
import PauseSVG from '../../../../../assets/svg/pause.svg';
import DeleteSVG from '../../../../../assets/svg/delete.svg';
import AlertModal from '../alertModal/AlertModal';

const PreviewVideo = ({
  onFileSelect,
  onClickRecord,
  performanceName,
  videoInfo,
  onUpdateVideo,
}) => {
  const [sizeError, setSizeError] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [removeVideo, setRemoveVideo] = useState(false);

  const onFileChange = e => {
    // check if the uploaded file has video size less then 10MB
    if (typeof e.target.files !== 'undefined') {
      const size = parseFloat(e.target.files[0].size / 1024).toFixed(2);
      if (size >= 10000) {
        setSizeError(true);
      } else {
        setSizeError(false);
        onFileSelect(e.target.files[0]);
      }
    }
  };

  const onRecordVideoClick = e => {
    e.stopPropagation();
    onClickRecord(e);
  };

  useEffect(
    () => {
      if (!videoRef.current) return;
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    },
    [videoRef.current, isPlaying],
  );

  const handleVideoPlay = () => {
    setIsPlaying(p => !p);
  };

  const inputEl = useRef(null);
  const URL = window.URL || window.webkitURL;

  const getVideoUrl = () => {
    if (!videoInfo) return;
    if (typeof videoInfo === 'string') {
      return videoInfo;
    }
    return URL.createObjectURL(videoInfo);
  };

  return (
    <>
      <div className="performance-video-preview">
        <h2 className="h2">Promotional Video</h2>
        <p>
          Record or upload a short video (45 sec max){' '}
          {performanceName && `to promote ${performanceName}`}
        </p>

        {!videoInfo ? (
          <div
            className="record-video"
            onClick={() => inputEl.current.click()}
            onKeyPress={() => inputEl.current.click()}
            role="button"
            tabIndex="0"
          >
            <input
              type="file"
              ref={inputEl}
              name="file"
              accept="video/mp4"
              onChange={e => onFileChange(e)}
              hidden
            />
            <img
              src={IMG.CLOUD_UPLOAD}
              className="upload"
              alt="upload background"
            />
            <div className="text">
              Drag & drop your video here,{' '}
              <span className="browser cursor-pointer">
                browse your computer
              </span>
              , or
            </div>

            <Button onClick={onRecordVideoClick}>Record A VIDEO</Button>

            {sizeError && (
              <div className="invalid-feedback">
                Video file size should not be more then 10 MB
              </div>
            )}
          </div>
        ) : (
          <div className="uploaded-video">
            <video
              src={getVideoUrl()}
              className="video-bg"
              id="videoStreamContainer"
              ref={videoRef}
            />
            <div
              className="play-button"
              onClick={handleVideoPlay}
              role="button"
              tabIndex="0"
              onKeyPress={handleVideoPlay}
            >
              {isPlaying ? (
                <img src={PauseSVG} className="pause-icon" alt="Pause" />
              ) : (
                <img src={PlaySVG} className="play-icon" alt="Play" />
              )}
            </div>
            <div className="bottom-btns-container">
              <Button onClick={onRecordVideoClick}>record a new video</Button>
              <div
                className="remove-btn"
                onClick={() => setRemoveVideo(true)}
                onKeyPress={() => setRemoveVideo(true)}
                role="button"
                tabIndex="0"
              >
                <img src={DeleteSVG} alt="Remove" />
              </div>
            </div>
          </div>
        )}
      </div>
      {removeVideo && (
        <AlertModal
          heading="Are you sure you want to delete the video?"
          description="You will not be able to restore deleted video"
          confirmCallBack={() => {
            setRemoveVideo(false);
            onFileSelect(null);
          }}
          cancelCallBack={() => setRemoveVideo(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

PreviewVideo.propTypes = {};

export default PreviewVideo;
