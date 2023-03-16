import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PERFORMANCE_STATUS } from 'app/app.constants.json';

import plToast from 'app/utils/toast';
import { TimeCounter } from '../../TimeCounter/TimeCounter';
import useApi from '../../../hooks/api';

const CardHeader = ({
  type,
  price,
  endDatetime,
  performance,
  onLikeDislikeClick,
}) => {
  const [heart, setHeart] = React.useState(performance.liked);

  const { postPerformerPerformanceIdIdLike } = useApi('performer');

  const userInfo = useSelector(state => state.global.userInfo);

  const handleLikeDislike = async e => {
    e.stopPropagation();
    try {
      await postPerformerPerformanceIdIdLike(performance.id);
      onLikeDislikeClick();
      setHeart(!heart);
    } catch (err) {
      plToast.error('Please try again later');
    }
  };

  return (
    <div className="card-header">
      <div className="live-header">
        {type === PERFORMANCE_STATUS.LIVE && (
          <div className="type">
            <span className="dot" />
            <span className="live-time">
              <TimeCounter
                onTimeOver={() => {}}
                startTime={endDatetime}
                onTimeStart={() => {}}
              />
            </span>
          </div>
        )}
        <div className="type">
          <span className="title">{price}</span>
        </div>
      </div>

      {userInfo.accessToken && (
        <div
          className="eye"
          onClick={handleLikeDislike}
          onKeyPress={handleLikeDislike}
          role="button"
          tabIndex="0"
        >
          <span className={heart ? 'heart-icon' : 'heartfav-icon'} />
        </div>
      )}
    </div>
  );
};

CardHeader.propTypes = {
  type: PropTypes.string,
  price: PropTypes.string,
  endDatetime: PropTypes.any,
  performance: PropTypes.object,
  onLikeDislikeClick: PropTypes.func,
};

export default CardHeader;
