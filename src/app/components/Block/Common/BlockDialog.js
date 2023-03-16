import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './BlockDialog.scss';
import Button from '../../Common/Button/Button';
import { putBlockUser } from '../../../../app/state/app.actions';
import plToast from '../../../utils/toast';

const BlockDialog = props => {
   const {
      from,
      heading,
      userInfo,
      confirmCallBack,
      cancelCallBack,
      confirmText,
      cancelText,
   } = props;

   const dispatch = useDispatch();

   const handleConfirm = () => {
      dispatch(putBlockUser({
         paramsToReplace: {id: (from == "chat" || from == "audience") ? userInfo.performerId : userInfo.id},
         data: {
            username: heading
         }
      }))
      confirmCallBack()
   }

   return (
      <div className="block-modal">
         <div className="modal-bg" />
         <div className="modal-body">
            <h2 className="modal-title">Block {heading} ?</h2>
            <p className="modal-description">
               The user will no longer be able to see your profile
               and Performances. The user will not know they <br/>
               have been blocked by you.
            </p>
            <div className="modal-action">
            <Button
               type="primary"
               size="large"
               background="transparent"
               border="gradient"
               onClick={cancelCallBack}
            >
               {cancelText || 'Cancel'}
            </Button>
            <Button
               type="primary"
               size="large"
               background="gradient"
               onClick={handleConfirm}
            >
               {confirmText || 'Block'}
            </Button>
            </div>
         </div>
      </div>
   )
}

BlockDialog.propTypes = {
   heading: PropTypes.string,
   confirmCallBack: PropTypes.func,
   cancelCallBack: PropTypes.func,
   confirmText: PropTypes.string,
   cancelText: PropTypes.string,
}

export default BlockDialog;