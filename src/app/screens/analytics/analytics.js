import React, { useState } from 'react';

import { useQuery } from 'react-query';
import { useApi } from '../../hooks/api';
import { TotalResults, Statistics, Earnings } from './components';
import './analytics.scss';

const Analytics = () => {
  const { getPerformerAnalytics } = useApi('performer');
  const [analyticsData, setAnalyticsData] = useState({});

  useQuery('getAnalytics', getPerformerAnalytics, {
    onSuccess: data => {
      const res = data.map(el => ({
        videoSec: el.videoSec,
        audienceCount: el.audienceCount,
      }));

      const analytics = { videoSec: 0, audienceCount: 0 };

      res.forEach(el => {
        analytics.videoSec += Number(el.videoSec);
        analytics.audienceCount += Number(el.audienceCount);
      });

      setAnalyticsData(analytics);
    },
  });

  return (
    <div className="analytics-container">
      <h1 className="h1">Analytics</h1>
      <TotalResults data={analyticsData} />
      <div className="statistic">
        <Statistics name="Profile" views={15} />
        <Statistics name="Livestream" views={20} />
      </div>
      <Earnings />
    </div>
  );
};

export default Analytics;
