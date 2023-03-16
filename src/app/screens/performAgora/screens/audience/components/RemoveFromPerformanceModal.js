import React from 'react';
import { useDispatch } from 'react-redux';
import { setStagePresence } from '../state/audience.actions';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
import Button from '../../../../../components/Common/Button';

function RemoveFromPerformanceModal() {
  const dispatch = useDispatch();
  const closeRemoveModal = () => {
    const data = {
      state: '',
    };
    dispatch(setStagePresence(data));
  };
  return (
    <>
      <div className="leave-stage-modal">
        <div className="modal-body">
          <div className="modal__top">
            <div className="title">
              Thanks for going Live with your Performer!
            </div>
            <Button
              size="default"
              background="glassy-white"
              className="circle-btn"
              onClick={() => closeRemoveModal()}
              suffix={<img src={CloseIcon} alt="close icon" />}
            />
          </div>
          <div className="description">
            While your Live on stage time ended, you can continue to enjoy the
            Performance!
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveFromPerformanceModal;
