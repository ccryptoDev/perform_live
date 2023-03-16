import { PERFORMANCE_STATUS } from 'app/app.constants.json';
import config from '../config/index.config';

export const getPastShareLink = (performanceId, performerId, perfType) => {
  const shareLinks = {
    [PERFORMANCE_STATUS.LIVE]: `/performlive/${performanceId}/performer/${performerId}`,
    [PERFORMANCE_STATUS.PUBLISHED]: `/performlive/${performanceId}/performer/${performerId}`,
    [PERFORMANCE_STATUS.PAST]: `/finishperformance/${performanceId}`,
  };

  return `${config.CLIENT_URL}${shareLinks[perfType]}`;
};
