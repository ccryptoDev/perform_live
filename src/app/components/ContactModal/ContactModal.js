import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import IMG from '../../utils/images';
import Button from '../Common/Button/Button';
import LabeledInput from '../LabeledInput';
import LabeledTextArea from '../LabeledTextArea';
import {postContactUs} from '../../../app/state/app.actions';
import './ContactModal.scss';
import {ValidEmail} from '../../screens/profile/components/EditModal/SocialValid';

const ContactModal = props => {
   const {
      heading,
      isShowModal,
      confirmCallBack,
      cancelCallBack
   } = props;
   const dispatch = useDispatch();

   const [fullName, setFullName] = useState('');
   const [email, setEmail] = useState('');
   const [subject, setSubject] = useState('');
   const [message, setMessage] = useState('');

   const [errorFullName, setErrorFullName] = useState(null);
   const [errorEmail, setErrorEmail] = useState(null);
   const [errorSubject, setErrorSubject] = useState(null);
   const [errorMessage, setErrorMessage] = useState(null);

   useEffect(() => setErrorFullName(null),  [fullName]);
   useEffect(() => setErrorEmail(null),  [email]);
   useEffect(() => setErrorSubject(null),  [subject]);
   useEffect(() => setErrorMessage(null),  [message]);

   const validation = () => {
      if(!fullName) {
         setErrorFullName('Please input your full name')
         return false;
      }
      if(!email) {
         setErrorEmail('Please input your email')
         return false;
      }
      if(!ValidEmail(email)) {
         setErrorEmail('Invalid email');
         return false;
      }
      if(!subject) {
         setErrorSubject('Please input subject')
         return false;
      }
      if(!message) {
         setErrorMessage('Please input message');
         return false;
      }
      return true;
   }

   const handleConfirm = async () => {
      if(!validation()) return;
      let payload = {
         fullname: fullName,
         email,
         subject,
         message
      }
      try {
         await dispatch(postContactUs(payload));
         confirmCallBack(false);
      } catch(error) {
         console.log("error during contact us: ", error);
      }
   }

   return (
      <>
         { 
            isShowModal && <div className="contact-modal">
               <div className="modal-bg" />
               <div className="modal-contact-body">
                  <h3 className="modal-title">{heading}</h3>
                  <span className="modal-subTitle">Please complete the form below</span>
                  <div className="close">
                     <img
                        src={IMG.MODAL_CLOSE}
                        className="close-icon"
                        alt="close icon"
                        onClick={cancelCallBack}
                        role="none"
                     />
                  </div>
                  <LabeledInput
                     name="fullName"
                     placeholder="Enter your full name"
                     label="Full name"
                     useShadow
                     value={fullName}
                     onChange={event => {
                        setFullName(event.target.value);
                     }}
                     error={errorFullName}
                  />
                  <LabeledInput
                     name="email"
                     placeholder="Enter your email"
                     label="Email"
                     useShadow
                     value={email}
                     onChange={event => {
                        setEmail(event.target.value);
                     }}
                     error={errorEmail}
                  />
                  <LabeledInput
                     name="subject"
                     placeholder={`What's this about?`}
                     label="Subject"
                     useShadow
                     value={subject}
                     onChange={event => {
                        setSubject(event.target.value);
                     }}
                     error={errorSubject}
                  />
                  <LabeledTextArea
                     name="message"
                     label="Message"
                     placeholder=""
                     maxLength="400"
                     useShadow
                     rows="3"
                     value={message}
                     onChange={event => {
                        setMessage(event.target.value);
                     }}
                     error={errorMessage}
                  />

                  <div className="modal-action">
                     <Button
                        className="submit-action"
                        type="primary"
                        size="large"
                        background="gradient"
                        onClick={handleConfirm}
                     >
                        <span className="btn-title">SUBMIT</span>
                     </Button>
                  </div>
               </div>
               
            </div>
         }
      </>
   )
}

ContactModal.propTypes = {
   heading: PropTypes.string,
   confirmCallBack: PropTypes.func,
   cancelCallBack: PropTypes.func
}

export default ContactModal;