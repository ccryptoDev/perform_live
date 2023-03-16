import React from 'react';
import PropTypes from 'prop-types';
import './verification';
import Button from '../../components/Common/Button/Button';

const FailedModal = (props) => {
   const {
      heading,
      description,
      onConfirmCallBack
   } = props;
   return (
      <div className="failed-modal">
         <div className="modal-bg"/>
         <div className="modal-body">
            <h2 className="modal-title">{heading}</h2>
            <p className="modal-description">{description}</p>
            <div className="modal-action">
               <Button
                  type="primary"
                  size="large"
                  background="gradient"
                  onClick={onConfirmCallBack}
               >
                  Got it
               </Button>
            </div>
         </div>
      </div>
   )
}

FailedModal.propTypes = {
   heading: PropTypes.string,
   description: PropTypes.string,
   onConfirmCallBack: PropTypes.func,
}

export default FailedModal;