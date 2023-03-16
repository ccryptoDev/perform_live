import React, { useEffect } from 'react';

export default props => {
  const {
    playerId,
    videoMuted,
    isVideoOn,
    isAudioOn,
    playHandler,
    isPerformerLive,
  } = props;
  //   const client = window.perform.getBordCastRTCClient();
  const playStream = () => {
    playHandler();
  };
  useEffect(() => {
    playStream();
  }, []);

  return (
    <>
      <div className="own">
        <div
          id={playerId}
          className={`performer-stream ${
            isPerformerLive ? 'performer-active' : ''
          }`}
          // style={videoMuted ? { opacity: 0 } : { opacity: 1 }}
        />
      </div>
    </>
  );
};
