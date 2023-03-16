import React, { useEffect, useRef } from 'react';

export const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(
    () => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    },
    [stream],
  );

  useEffect(
    () => () => {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks()[0].stop();
      }
    },

    [],
  );
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} autoPlay />;
};
