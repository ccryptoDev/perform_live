import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
// import SettingIcon from '../../assets/svg/review-setting.svg';
import { IMG } from '../performer.dependencies';
import '../../../../../styles/performerview/live-buttons.scss';
import ConfirmFinishPerformanceModal from './confirmFinishPerformanceModal';
import Button from '../../../../../components/Common/Button';

import Recording from './Recording/Recording';

// import Recording from './Recording/Recording';

export default function LiveButtons({ openSettingClick, onConfirmFinish }) {
  const [isFinishModalOpen, setFinishModalOpen] = useState(false);

  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );

  const onFinishPerformance = useCallback(() => {
    setFinishModalOpen(true);
  }, []);

  const onCancelFinish = useCallback(() => {
    setFinishModalOpen(false);
  }, []);

  return (
    <div className="performer-live-buttons">
      <Button
        background="transparent"
        type="secondary"
        className="open-setting"
        onClick={openSettingClick}
        prefix={<img src={IMG.REVIEW_SETTING} alt="setting" />}
      >
        Open settings
      </Button>
      <Button
        background="transparent"
        border="gradient"
        className="finish-performance"
        onClick={onFinishPerformance}
      >
        End Performance
      </Button>
      {/* <button className="open-setting" type="button" onClick={openSettingClick}>
        <img src={IMG.REVIEW_SETTING} alt="setting" />
        Open settings
      </button>
      <button
        className="finish-performance"
        type="button"
        onClick={onFinishPerformance}
      >
        Finish Performance
      </button> */}
      <Recording />
      {isFinishModalOpen && (
        <ConfirmFinishPerformanceModal
          onCancel={onCancelFinish}
          onConfirm={onConfirmFinish}
          endDatetime={performanceData.endDatetime}
        />
      )}
    </div>
  );
}
