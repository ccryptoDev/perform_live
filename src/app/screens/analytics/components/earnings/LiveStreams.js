import React from 'react';
import propTypes from 'prop-types';

const LiveStreams = ({ streamsData }) => {
  return (
    <div className="livestreams">
      <div className="livestreams-header">headers</div>
      {streamsData.map(streamData => streamData)}
    </div>
  );
};

LiveStreams.propTypes = {
  streamsData: propTypes.array,
  // showDetails: propTypes.func,
};

export default LiveStreams;
