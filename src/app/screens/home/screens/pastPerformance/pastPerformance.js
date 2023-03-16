// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Flickity from 'react-flickity-component';
// import Card from '../../../../components/Card';
// import { IMG } from '../../home.dependencies';

// const flickityOptions = {
//   initialIndex: 5,
// };

// const PastPerformance = props => {
//   const { performanceData } = props;

//   const getCards = () => {
//     const cards = performanceData.map(
//       performance =>
//         performance.state === 'published' && (
//           <Card // for timing being then will change again to live
//             key={performance.id}
//             performanceData={performance}
//             type="popular"
//           />
//         ),
//     );

//     return cards;
//   };

//   const onPrevClick = () => {
//     const prevButtonRef = document
//       .getElementById('past')
//       .getElementsByClassName('previous');
//     prevButtonRef[0].click();
//   };

//   const onNextClick = () => {
//     const prevButtonRef = document
//       .getElementById('past')
//       .getElementsByClassName('next');
//     prevButtonRef[0].click();
//   };

//   return (
//     <div className="row-content past flickity-performance" id="past">
//       <div className="content-top">
//         <div className="title">
//           {/* <img src={IMG.LIVE_LOGO} className="live-logo" alt="live logo" /> */}
//           <span className="title-bold margin-0">Past</span>
//           <span className="text">popular</span>
//         </div>
//         <div className="view-all">
//           <Link to="/popular" className="view-text">
//             View All
//           </Link>
//           <img
//             src={IMG.VIEW_LEFT}
//             className="left-arrow icon"
//             alt="left"
//             onClick={onPrevClick}
//             role="none"
//           />
//           <img
//             src={IMG.VIEW_RIGHT}
//             className="right-arrow icon"
//             alt="right"
//             onClick={onNextClick}
//             role="none"
//           />
//         </div>
//       </div>
//       {/* <div className="cards flickity-slider"> */}
//       {(performanceData.length && (
//         <Flickity
//           className="carousel cards" // default ''
//           elementType="div" // default 'div'
//           options={{
//             initialIndex: performanceData.length - 1,
//           }} // takes flickity options {}
//           disableImagesLoaded={false} // default false
//           reloadOnUpdate // default false
//         >
//           {performanceData.map(
//             performance =>
//               performance.state === 'published' && (
//                 <Card // for timing being then will change again to live
//                   key={performance.id}
//                   performanceData={performance}
//                   type="popular"
//                 />
//               ),
//           )}
//         </Flickity>
//       )) ||
//         ''}
//       {/* </div> */}
//     </div>
//   );
// };

// PastPerformance.propTypes = {
//   performanceData: PropTypes.array,
// };

// export default memo(PastPerformance);
