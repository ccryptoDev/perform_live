/**
 *
 * PerformanceCategoriesModal
 *
 */

import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Modal from '../../../../components/Modal';
import { showPlanModal } from '../../../../state/app.actions';
import { IMG } from '../../performanceScheduler.dependencies';

import './PerformanceCategoriesModal.scss';

// import PropTypes from 'prop-types';

export const PerformanceCategoriesModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    // Can be treated as mount/unmount hook, or update hook if observable is passed in 2nd argument.
  }, []); // Add observable in array if you want the hook to run on updating those values

  const handlePlanClick = performanceType => {
    // close the popup
    handleClose();
    history.push(`/performancescheduler?type=${performanceType}`);
  };

  const handleClose = () => {
    dispatch(showPlanModal(false));
  };

  return (
    <div className="performance-plan-modal">
      <div className="modal">
        <div className="modal-plan">
          <div className="card">
            <div className="close" onClick={handleClose}>
              <img className="close-btn" src={IMG.CLOSE_SVG} alt="close icon" />
            </div>
            <div className="card-header">
              <div className="title">Plan a Performance</div>
              <div className="question">
                What are you going to do during the performance?
              </div>
            </div>
            <div className="modal-body">
              {/* <Link to={'/performancescheduler?type=share-skill'}> */}
              <div className="share">
                <div className="talent">
                  <img
                    className="mike"
                    src={IMG.MIKE_SVG}
                    alt="share my talent"
                  />
                  <span className="text">Share my talent</span>
                  <img className="arrow" src={IMG.ARROW_RIGHT} alt="arrow" />
                </div>
              </div>
              {/* </Link> */}
              <div className="sell" onClick={() => handlePlanClick('sale')}>
                <div className="talent">
                  <img
                    className="mike"
                    src={IMG.BAG_SVG}
                    alt="share my talent"
                  />
                  <span className="text">Sell products</span>
                  <img className="arrow" src={IMG.ARROW_RIGHT} alt="arrow" />
                </div>
              </div>
              <div className="share-sell">
                <div className="talent">
                  <img
                    className="mike"
                    src={IMG.STAR_SVG}
                    alt="share my talent"
                  />
                  <span className="text">Share my talent & sell products</span>
                  <img className="arrow" src={IMG.ARROW_RIGHT} alt="arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PerformanceCategoriesModal.propTypes = {};

export default memo(PerformanceCategoriesModal);
