import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { IMG } from '../profile.dependencies';
import AppConstants from 'app/app.constants.json';
import PerformanceGalleryView from './PerformanceGalleryView';

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

const PerformanceGallery = ({
  performances,
  handleNextClick,
  handlePrevClick,
  toggleActiveState,
  deletePerformance,
  userInfo
}) => {
  const [headerText, setHeaderText] = useState({bold:'Live', light: 'now'});
  const [performanceType, setPerformanceType] = useState(AppConstants.PERFORMANCE_STATUS.LIVE);
  const slider = useRef();

  const onPrevClick = () => {
    slider.current.slickPrev();
    handlePrevClick(performanceType);
  };

  const onNextClick = () => {
    slider.current.slickNext();
    handleNextClick(performanceType);
  };
  useEffect(() => {
     if(performances.length > 0) {
        switch(performances[0].state) {
           case 'past':
              setHeaderText({
                 bold: 'Past',
                 light: 'shows'
              });
              setPerformanceType(AppConstants.PERFORMANCE_STATUS.PAST);
              break;
           case 'published':
              setHeaderText({
                 bold: 'Coming',
                 light: 'soon'
              });
              setPerformanceType(AppConstants.PERFORMANCE_STATUS.PUBLISHED);
              break;
           case 'draft':
              setHeaderText({
                 bold: 'Draft'
              });
              setPerformanceType(AppConstants.PERFORMANCE_STATUS.DRAFT);
              break;
           default:
              break;
        }

     }
  }, [performances])

  return (
     <div className="content mt-40">
        <div className="content-top">
           <div className="title">
              {(performanceType === AppConstants.PERFORMANCE_STATUS.LIVE && (
                 <img src={IMG.LIVE_LOGO} className="live-logo" alt="live logo" />
              )) ||
                 ''}

              <span className="title-bold">{headerText.bold}</span>
              <span className="text">{headerText.light}</span>
           </div>
           {performances.length >= 6 ? (
              <div className="view-all">
                 <span
                 className="view-text"
                 onClick={() => toggleActiveState(performanceType)}
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
        {
           performances.length >= 6 ? (
              <Slider ref={slider} {...settings}>
                 { PerformanceGalleryView({ performances, removePerformance: deletePerformance, userInfo }) }
              </Slider>
           ) : (
              <div className="cards flex-row">
                 <PerformanceGalleryView performances={performances} removePerformance={deletePerformance} userInfo={userInfo} />
              </div>
           )
        }
     </div>
  )
}

export default PerformanceGallery;