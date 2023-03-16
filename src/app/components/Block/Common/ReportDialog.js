import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IMG from 'app/utils/images';
import PropTypes from 'prop-types';
import Button from '../../Common/Button/Button';
import DropDown from '../../Dropdown/Dropdown';
import { Reason } from './Reason';
import { 
   postReportUser,
   postReportMessage, 
   postReportPerformer,  
} from '../../../../app/state/app.actions';
import './ReportDialog.scss';

const ReportDialog = props => {
   const {
      from,
      heading,
      account,
      comment,
      performance,
      message,
      userInfo,
      performInfo = {},
      confirmCallBack = () => {},
      cancelCallBack  = () => {},
   } = props;

   const dispatch = useDispatch();
   const [checkType, setCheckType] = useState(null);
   const [reason, setReason] = useState('');
   const [error, setError] = useState(null);
   const [isShow, setIsShow] = useState(true);
   
   const RadioImg = ({type}) => {
      return (
         <img 
            src={
               checkType == type && 
                  IMG.AUDI_RADIO_ACTIVE || 
                  IMG.AUDI_RADIO_INACTIVE
            }
         />
      )
   }

   const handleConfirm = () => {
      if(!reason) {
         setError('Please select the reason');
         return;
      }

      if(account) {
         dispatch(postReportUser({
            paramsToReplace: {
               id: (from == "chat" || from == "audience") ? userInfo.performerId : userInfo.id},
            data: {reasons: [reason]}
         }));
      }
      if(comment) {
         dispatch(postReportMessage({
            paramsToReplace: {id: (from == "chat" || from == "audience") ? userInfo.performerId : userInfo.id},
            data: {
               reasons: [reason],
               message: message
            }
         }));
      }
      if(performance) {
         dispatch(postReportPerformer({
            paramsToReplace: {id: userInfo},
            data: {
               reasons: [reason],
               performanceId: performInfo
            }
         }))
         setIsShow(false);
      }
      confirmCallBack();
   }

   return (<>
      {isShow && <div className="report-modal">
         <div className="modal-bg" />
         <div className="modal-report-body">
            <h3 className="modal-title">{heading}</h3>
            <span className="modal-subTitle">
               Where are you reporting this {(account || performance) ? 'account' : 'comment'}?
            </span>
            <span className="modal-description">
               Your report is anonymous. If someone is in immediate <br/>
               danger. please call the emergency services immediately.
            </span>
            <div className="close">
               <img
                  src={IMG.MODAL_CLOSE}
                  className="close-icon"
                  alt="close icon"
                  onClick={cancelCallBack}
                  role="none"
               />
            </div>
            <div className="check-container">
               {comment && <div 
                  className="check-row"
                  onClick={() => {
                     setError(null);
                     setReason(`It's spam`);
                     setCheckType("second");
                  }}
               >
                  <RadioImg type="second" />
                  It's spam
               </div>}
               <div 
                  className={`check-row ${checkType == "first" && "delBorder" }`}
                  onClick={() => {
                     setError(null);
                     setReason('');
                     setCheckType("first");
                  }}
               >
                  <div className="check-row-header">
                     <RadioImg type="first" />
                     It's inappropriate
                  </div>
               </div>
               <div className={`dropdown ${checkType == "first" && "addBorder" }`}>
                  { checkType == "first" && (
                     <DropDown
                        options={Reason}
                        onChange={(item)=>{
                           setReason(item.value);
                        }}
                     />
                  )}
               </div>
               {(account || performance) && <div 
                  className="check-row"
                  onClick={() => {
                     setError(null);
                     setReason(`It's spam`);
                     setCheckType("second");
                  }}
               >
                  <RadioImg type="second" />
                  It's spam
               </div>}
               {comment && <div 
                  className="check-row"
                  onClick={() => {
                     setError(null);
                     setReason(`Aggressive languate`);
                     setCheckType("third");
                  }}
               >
                  <RadioImg type="third" />
                  Aggressive language
               </div>}
               <div className="error-message">{error}</div>
            </div>

            <div className="modal-action">
               <Button
                  className="action-btn"
                  type="primary"
                  size="large"
                  background="transparent"
                  border="gradient"
                  onClick={cancelCallBack}
               >
                  {'Cancel'}
               </Button>
               <Button
                  className="action-btn"
                  type="primary"
                  size="large"
                  background="gradient"
                  onClick={handleConfirm}
                  disabled={Boolean(!reason)}
               >
                  {'Submit'}
               </Button>
            </div>
         </div>
      </div>}
      </>
   )
}

ReportDialog.propTypes = {
   heading: PropTypes.string,
   account: PropTypes.bool,
   comment: PropTypes.bool,
   performance: PropTypes.bool,
   message: PropTypes.string,
   // userInfo: PropTypes.object,
   // performInfo: PropTypes.object,
   confirmCallBack: PropTypes.func,
   cancelCallBack: PropTypes.func
}

export default ReportDialog;