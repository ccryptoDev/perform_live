// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Flickity from 'react-flickity-component';
// import Card from '../../../../components/Card';
// import { IMG } from '../../home.dependencies';

// const UpcomingPerformance = props => {
//   const { performanceData } = props;

//   const getCards = () => {
//     const cards = performanceData.map(
//       performance =>
//         performance.state === 'published' && (
//           <Card // for timing being then will change again to live
//             key={performance.id}
//             performanceData={performance}
//             type="upcoming"
//           />
//         ),
//     );

//     return cards;
//   };

//   const onPrevClick = () => {
//     const prevButtonRef = document
//       .getElementById('upcoming')
//       .getElementsByClassName('previous');
//     prevButtonRef[0].click();
//   };

//   const onNextClick = () => {
//     const prevButtonRef = document
//       .getElementById('upcoming')
//       .getElementsByClassName('next');
//     prevButtonRef[0].click();
//   };

//   return (
//     <div className="row-content upcoming flickity-performance" id="upcoming">
//       <div className="content-top">
//         <div className="title">
//           {/* <img src={IMG.LIVE_LOGO} className="live-logo" alt="live logo" /> */}
//           <span className="title-bold margin-0">Coming</span>
//           <span className="text">soon</span>
//         </div>
//         <div className="view-all">
//           <Link to="/upcoming" className="view-text">
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
//       {performanceData.length && (
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
//                   type="upcoming"
//                 />
//               ),
//           )}
//         </Flickity>
//       )}
//       {/* <div className="cards">
//         {performanceData.map(
//           performance =>
//             performance.state === 'published' && (
//               <Card // for timing being then will change again to live
//                 key={performance.id}
//                 performanceData={performance}
//                 type="upcoming"
//               />
//             ),
//         )}
//       </div> */}
//     </div>
//   );
// };

// UpcomingPerformance.propTypes = {
//   performanceData: PropTypes.array,
// };

// export default memo(UpcomingPerformance);
