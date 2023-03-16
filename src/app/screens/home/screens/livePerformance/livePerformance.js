// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Card from '../../../../components/Card';
// import { IMG } from '../../home.dependencies';

// const LivePerformance = props => {
//   const { performanceData, type } = props;
//   // const performanceData = useSelector(state => state.home.performanceData);
//   return (
//     <div className="row-content live">
//       <div className="content-top">
//         <div className="title">
//           <img src={IMG.LIVE_LOGO} className="live-logo" alt="live logo" />
//           <span className="title-bold">Live</span>
//           <span className="text">now</span>
//         </div>
//         {type === 'live' ? (
//           <>
//             <div className="view-all">
//               <Link to="/live" className="view-text">
//                 View All
//               </Link>
//               <img src={IMG.VIEW_LEFT} className="left-arrow icon" alt="left" />
//               <img
//                 src={IMG.VIEW_RIGHT}
//                 className="right-arrow icon"
//                 alt="right"
//               />
//             </div>
//           </>
//         ) : null}
//       </div>
//       <div className="cards">
//         {performanceData.map(
//           performance =>
//             performance.state === 'published' && (
//               <div className="card-box">
//                 <Card // for timing being then will change again to live
//                   key={performance.id}
//                   performanceData={performance}
//                   type="live"
//                 />
//               </div>
//             ),
//         )}
//       </div>
//     </div>
//   );
// };

// LivePerformance.propTypes = {
//   performanceData: PropTypes.array,
// };

// export default memo(LivePerformance);
