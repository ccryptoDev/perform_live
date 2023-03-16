import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import { updatePerformer } from '../../../../state/app.actions';
import { IMG } from '../../performanceScheduler.dependencies';
import {
  getPerformerTagOptions,
  getVerifyPerformerTag,
} from '../../state/performanceScheduler.actions';

import './FinalCheckModal.scss';
import plToast from '../../../../utils/toast';
const FinalCheckModal = props => {
  const [finalCheckInfo, setFinalCheck] = useState({
    stageName: '',
    tag: '',
  });

  const dispatch = useDispatch();
  const performerTagOptions = useSelector(
    state => state.performancescheduler.performerTagOptions,
  );

  const isTagAvailable = useSelector(
    state => state.performancescheduler.isTagAvailable,
  );

  const getVerifyTagDelayed = useCallback(
    _debounce(searchTag => verifyTag(searchTag), 1000),
    [],
  );

  const verifyTag = searchTag => {
    dispatch(
      getVerifyPerformerTag({
        paramsToReplace: { tag: searchTag },
      }),
    );
  };

  const handleInputChange = e => {
    if (e.persist) e.persist();
    // if displayName is changing
    // let { performliveUrl } = finalCheckInfo;
    // if (e.target.name === 'displayName') {
    //   performliveUrl = `${window.location.origin}/${e.target.value}`;
    // }
    setFinalCheck(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'tag') {
      getVerifyTagDelayed(e.target.value);
    }
  };

  const handleScheduleClick = () => {
    // check if all the values are filled
    if (!finalCheckInfo.stageName) {
      plToast.error('Please fill display name to proceed');
    } else {
      // update performer info
      dispatch(updatePerformer(finalCheckInfo));
      props.onFinishFinalCheck();
    }
  };

  const handleVerifyPhoneNumber = () => {};
  // get performer tag options
  useEffect(() => {
    dispatch(getPerformerTagOptions());
  }, []);

  useEffect(
    () => {
      if (performerTagOptions.length) {
        // select the first tag option for now and set it as performer performlive url

        setFinalCheck(prevState => ({
          ...prevState,
          tag: performerTagOptions[0],
        }));
      }
    },
    [performerTagOptions],
  );

  return (
    <>
      <div className="final-check-modal">
        <div className="modal-bg" />
        <div className="modal-body">
          <img
            src={IMG.MODAL_CLOSE}
            className="close-modal"
            alt="close modal"
            onClick={() => props.onClose()}
            role="none"
          />
          <h3 className="modal-title">Final Step</h3>
          <p className="modal-description">
            As this performance is the first one, fill your name and create URL
          </p>
          <div className="modal-action">
            <div className="stage-name input-group">
              <div className="name">Display name</div>
              <input
                name="stageName"
                className="input"
                placeholder="Name"
                value={finalCheckInfo.stageName}
                onChange={handleInputChange}
              />
            </div>
            <div className="unique-url input-group">
              <div className="name">PerformLive URL</div>
              <div className="performlive_url">
                <span className="input web_fixed_prefix">
                  performlive.live/
                </span>
                <span className="web_fixed_postfix">
                  <input
                    name="tag"
                    className="input stage_name"
                    value={`${finalCheckInfo.tag}`}
                    maxLength="14"
                    onChange={handleInputChange}
                  />
                  {isTagAvailable && (
                    <img
                      src={IMG.CHECK_OK}
                      className="check-ok"
                      alt="check ok"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="phone-number-group">
              <div className="phone-number input-group">
                <div className="name">Phone Number</div>
                <input
                  className="input"
                  placeholder="Phone Number"
                  disabled
                  value={finalCheckInfo.phoneNumber}
                />
                <img src={IMG.CHECK_OK} className="check-ok" alt="check ok" />
              </div>
              <button
                className="verify-btn"
                type="button"
                onClick={handleVerifyPhoneNumber}
                disabled
              >
                Verify
              </button>
            </div>
            <button
              className="schedule-btn"
              type="button"
              onClick={handleScheduleClick}
              disabled={!finalCheckInfo.stageName || !isTagAvailable}
            >
              SCHEDULE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

FinalCheckModal.propTypes = {
  onFinishFinalCheck: PropTypes.func,
};

export default memo(FinalCheckModal);
