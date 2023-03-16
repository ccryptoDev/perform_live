import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';

import PlaySVG from '../../../../../assets/svg/play.svg';
import PauseSVG from '../../../../../assets/svg/pause.svg';
import { getShortMonthName } from '../../../../utils/timeConverter';
import { PerformanceFooter } from '../../components/PerformanceFooter/PerformanceFooter';
import EditIcon from '../../../../../assets/svg/btns/edit.svg';
import CheckedIcon from '../../../../../assets/svg/btns/checked.svg';

const Summary = ({ performanceData, onNextClick, onEditClick, onBack }) => {
  const performerProducts = useSelector(state => state.global.productList);

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPlay = () => {
    if (videoRef.current.paused === true) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(
    () => {
      if (videoRef.current) {
        videoRef.current.ontimeupdate = event => {
          if (
            videoRef.current.currentTime === 0 ||
            videoRef.current.currentTime === videoRef.current.duration
          ) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        };
      }
    },
    [videoRef.current],
  );

  const startM = moment(performanceData.start);
  const endM = moment(performanceData.end);

  return (
    <>
      <div className="content summary-container">
        <h3>Summary</h3>
        <p>Check if everything is correct</p>
        <div className="description-summary">
          <h4>{performanceData.name}</h4>
          <img
            src={EditIcon}
            alt="edit"
            onClick={() => onEditClick(1)}
            role="none"
          />
          <div className="date-info">
            <div className="date">
              {getShortMonthName(moment(performanceData.start).format('M') - 1)}
              , {moment(performanceData.start).format('DD')}
            </div>
            <div className="time-duration">
              {startM.format('hh:mm')} - {endM.format('hh:mm')}{' '}
              <span>{endM.format('A')}</span>
            </div>
            {!!performanceData.categories.length &&
              performanceData.categories.map(category => (
                <div className="category">{category}</div>
              ))}
          </div>

          <div className="description">{performanceData.details}</div>
          <div className="description__detail">
            <div className="detail__col">
              <span className="detail__text">
                {performanceData.maxAudienceSize}
              </span>
              <span className="detail__title">Audience size</span>
            </div>
            <div className="detail__col">
              <span className="detail__text">
                {performanceData.giftEnabled ? 'Yes' : 'No'}
              </span>
              <span className="detail__title">Allow gifts</span>
            </div>
            <div className="detail__col">
              <span className="detail__text">
                {performanceData.stageEnabled ? 'Yes' : 'No'}
              </span>
              <span className="detail__title">Join the stage</span>
            </div>
          </div>
        </div>

        <div className="product-list">
          <h4>Products</h4>
          <img
            src={EditIcon}
            alt="edit"
            onClick={() => onEditClick(2)}
            role="none"
          />
          <p>{performanceData.selectedProducts.length} items added</p>
          <div className="product-gallery">
            {performanceData.selectedProducts.map(productId => {
              const productInfo = performerProducts.find(
                product => product.id === productId,
              );
              return (
                <img
                  src={
                    productInfo.gallery &&
                    productInfo.gallery[0] &&
                    productInfo.gallery[0].url
                  }
                  alt="product1"
                  key={productInfo.id}
                />
              );
            })}
          </div>
        </div>

        <div className="promotional-video">
          <h4>Performance Preview</h4>
          <img
            src={EditIcon}
            alt="edit"
            onClick={() => onEditClick(3)}
            role="none"
          />
          <div className="video-container">
            <video
              src={performanceData.videoUrl}
              id="videoStreamContainer"
              ref={videoRef}
              poster={performanceData.coverUrl}
            />
            <div
              className="play-button"
              onClick={handleVideoPlay}
              role="button"
              tabIndex="0"
              onKeyPress={handleVideoPlay}
            >
              <img src={isPlaying ? PauseSVG : PlaySVG} alt="Play" />
            </div>
          </div>
        </div>
      </div>

      <PerformanceFooter
        onNext={() => onNextClick()}
        nextButtonText="Schedule Performance"
        btnSuffix={
          <img src={CheckedIcon} className="checked-icon" alt="checked" />
        }
        onBack={onBack}
      />
    </>
  );
};

Summary.propTypes = {
  performanceData: PropTypes.object,
  onSchedulePerformanceClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default Summary;
