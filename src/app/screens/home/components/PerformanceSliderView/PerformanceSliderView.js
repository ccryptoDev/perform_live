import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import AppConstants from 'app/app.constants.json';
import { IMG } from '../../home.dependencies';
import Card from '../../../../components/Card';
import './PerformanceSliderView.scss';

const settings = {
  initialSlide: 0,
  dots: false,
  infinite: false,
  arrows: false,
  draggable: false,
  speed: 500,
  centerMode: false,
  slidesToShow: 4,
  slidesToScroll: 6,
  variableWidth: true,
};

const PerformanceGalleryView = ({
  performanceData,
  performanceType,
  handleRegister,
  handleJoin,
  handleCardClick,
  onShare,
}) =>
  performanceData.map(
    performance =>
      performance.state !== 'draft' && (
        <Card // for timing being then will change again to live
          key={performance.id}
          performanceData={performance}
          type={performanceType}
          handleRegister={handleRegister}
          handleJoin={handleJoin}
          handleCardClick={handleCardClick}
          onShare={onShare}
        />
      ),
  );

PerformanceGalleryView.propTypes = {
  performanceData: PropTypes.array,
  performanceType: PropTypes.string,
};

const PerformanceSliderView = props => {
  const {
    performanceData,
    performanceType,
    headerText,
    handleCardClick,
    handleRegister,
    handleJoin,
    onShare,
  } = props;
  const slider = useRef();

  const onPrevClick = () => {
    slider.current.slickPrev();
    props.onPrevClick(props.performanceType);
  };

  const onNextClick = () => {
    slider.current.slickNext();
    props.onNextClick(props.performanceType);
  };

  return (
    <div
      className={[
        'row-content',
        performanceData.length >= 6 ? 'slick-performance' : 'performance',
      ].join(' ')}
      id={performanceType}
    >
      <div className="content-top">
        <div className="title">
          {(performanceType === AppConstants.PERFORMANCE_STATUS.LIVE && (
            <img src={IMG.LIVE_LOGO} className="live-logo" alt="live logo" />
          )) ||
            ''}

          <span className="title-bold">{headerText.bold}</span>
          <span className="text">{headerText.light}</span>
        </div>

        {performanceData.length >= 6 ? (
          <div className="view-all">
            <span
              className="view-text"
              onClick={() => props.toggleToFullView(performanceType)}
              role="none"
            >
              View All
            </span>
            <button
              type="button"
              className="slider-btn slider-prev-btn"
              onClick={onPrevClick}
            />
            <button
              type="button"
              className="slider-btn slider-next-btn"
              onClick={onNextClick}
            />
          </div>
        ) : null}
      </div>
      {(performanceData.length &&
        (performanceData.length >= 6 ? (
          <Slider ref={slider} {...settings}>
            {PerformanceGalleryView({
              performanceData,
              performanceType,
              handleRegister,
              handleJoin,
              onShare,
            })}
          </Slider>
        ) : (
          // <Flickity
          //   ref={slider}
          //   className="carousel cards" // default ''
          //   elementType="div" // default 'div'
          //   options={{
          //     initialIndex: 0,
          //     contain: true,
          //     draggable: false,
          //   }} // takes flickity options {}
          //   disableImagesLoaded={false} // default false
          //   reloadOnUpdate // default false
          // >
          //   {PerformanceGalleryView({ performanceData, performanceType })}
          // </Flickity>
          <div className="cards">
            <PerformanceGalleryView
              performanceData={performanceData}
              performanceType={performanceType}
              handleRegister={handleRegister}
              handleJoin={handleJoin}
              onShare={onShare}
              handleCardClick={handleCardClick}
            />
          </div>
        ))) ||
        ''}
    </div>
  );
};

PerformanceSliderView.propTypes = {
  performanceData: PropTypes.array,
  performanceType: PropTypes.string,
  toggleToFullView: PropTypes.func,
  headerText: PropTypes.object,
};

export default PerformanceSliderView;
