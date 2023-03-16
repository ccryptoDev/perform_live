import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { IMG } from '../../performanceScheduler.dependencies';
import { Filters } from './components/Filters';
import { Facial } from './components/Facial';
import { VideoPreview } from './components/VideoPreview';

const RecordVideo = props => {
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  // const [performanceCoverBlob, setPerformanceCover] = useState(null);
  const [isRecording, setRecording] = useState(false);
  const [circumference, setCircumference] = useState(0);
  const [hideFilters, setHideFilters] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const progressiveRing = React.useRef(null);
  const intervalRef = React.useRef(null);
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
  } = useReactMediaRecorder({ video: true });

  useEffect(
    () => {
      if (mediaBlobUrl) {
        fetch(mediaBlobUrl)
          .then(r => r.blob())
          .then(videoBlob => {
            const videoFile = new File([videoBlob], 'performancePreview.mp4', {
              type: 'video/mp4',
            });
            props.onStopRecording(videoFile);
          });
      }
    },
    [mediaBlobUrl],
  );

  const onStartRecording = e => {
    startRecording();
    setRecordingStatus('started');
    setRecording(true);
  };

  const onStopRecording = async () => {
    await stopRecording();
    setRecordingStatus('stopped');
    setRecording(false);
    clearInterval(intervalRef.current);
  };

  // initiating the progressiveRing
  useEffect(
    () => {
      if (progressiveRing.current && isRecording) {
        const radius = progressiveRing.current.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        setCircumference(circumference);

        progressiveRing.current.style.strokeDasharray = `${circumference} ${circumference}`;
        progressiveRing.current.style.strokeDashoffset = `${circumference}`;
      }
    },
    [progressiveRing.current, isRecording],
  );

  // Starting the progressiveRing for upto 45 sec.
  useEffect(
    () => {
      if (circumference && recordingStatus === 'started') {
        let timer = 0;
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            const currentProgress = Math.floor((timer * 100) / 45);
            setProgress(currentProgress);
            if (timer === 45) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              onStopRecording();
            } else {
              ++timer;
            }
          }, 1000);
        }
      }
      return () => clearInterval(intervalRef.current);
    },
    [circumference, recordingStatus],
  );
  const [tab, setTab] = React.useState(0);

  const setProgress = percent => {
    const offset = circumference - (percent / 100) * circumference;
    progressiveRing.current.style.strokeDashoffset = offset;
  };

  return (
    <div className="record-container">
      <div className="record">
        <div className="check-layout">
          <div className="card">
            <div className="check-body">
              <div className="camera-field">
                <div id="webar" className="camera-img">
                  <VideoPreview stream={previewStream} />
                  <img
                    className="back"
                    onClick={async () => {
                      await stopRecording();
                      props.onClose();
                    }}
                    src={IMG.RECORD_CLOSE}
                    alt="back icon"
                    role="none"
                  />
                </div>

                {!hideFilters && (
                  <div className="record-start">
                    {!isRecording ? (
                      <button
                        className="red-btn"
                        onClick={onStartRecording}
                        type="button"
                      />
                    ) : (
                      <>
                        <div className="progressive-ring-bg" />
                        <svg className="progress-ring" width="48" height="48">
                          <circle
                            ref={progressiveRing}
                            className="progress-ring__circle"
                            stroke="white"
                            strokeWidth="3"
                            fill="transparent"
                            r="22"
                            cx="24"
                            cy="24"
                          />
                        </svg>
                        <button
                          className="red-stop-btn"
                          onClick={onStopRecording}
                          type="button"
                        />
                      </>
                    )}
                  </div>
                )}

                <div className="ar-settings">
                  {!hideFilters && (
                    <>
                      <div className="settings-top">
                        <div className="setting-icon">
                          <img
                            src={IMG.FILTERS_ICON}
                            className={tab == 0 ? 'icon active' : 'icon'}
                            alt="filters icon"
                            onClick={() => setTab(0)}
                            role="none"
                          />
                          <img
                            src={IMG.FACIAL_ICON}
                            className={tab == 1 ? 'icon active' : 'icon'}
                            alt="facial icon"
                            onClick={() => setTab(1)}
                            role="none"
                          />
                          <img
                            src={IMG.AR_ICON}
                            className={tab == 2 ? 'icon active' : 'icon'}
                            alt="ar back"
                            onClick={() => setTab(2)}
                            role="none"
                          />
                          <span className="ar-label">Coming soon</span>
                        </div>
                        <div className="clear-all cursor-pointer">
                          Clear all
                        </div>
                      </div>
                      <div className="border-line" />
                      <div className="settings-body">
                        <div className="top">
                          <div className="left-text">Apply any filter</div>
                          <span className="clear cursor-pointer">Clear</span>
                        </div>
                        {tab === 0 ? <Filters /> : null}
                        {tab === 1 ? <Facial /> : null}
                        {tab === 2 ? <Filters /> : null}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordVideo;
