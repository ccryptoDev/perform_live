import React from 'react';
import Card from './PerformanceCard';

const PerformanceGalleryView = ({
  performances,
  removePerformance,
  userInfo
}) => (
  performances.map((performance, index) => (
     <Card
        key={index}
        performance={performance}
        deletePerformance={removePerformance}
        userInfo={userInfo}
     />
  ))
)

export default PerformanceGalleryView;