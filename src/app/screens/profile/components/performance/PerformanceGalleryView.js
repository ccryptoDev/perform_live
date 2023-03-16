import React from 'react';
import Card from './PerformanceCard';

const PerformanceGalleryView = ({
  performances,
  removePerformance,
  userInfo,
  onShare
}) => (
  performances.map((performance, index) => (
     <Card
        key={index}
        performance={performance}
        deletePerformance={removePerformance}
        userInfo={userInfo}
        onShare={onShare}
     />
  ))
)

export default PerformanceGalleryView;