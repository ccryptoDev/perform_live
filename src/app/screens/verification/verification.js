import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {useQuery as useLocationQuery} from '../../utils/common';
import Button from '../../components/Common/Button/Button';
import FailedModal from './FailedModal';
import {Link} from 'react-router-dom';
import './verification.scss';

const Verification = () => {
   const history = useHistory();
   const query = useLocationQuery(window.location.search);
   const failed = query.get('failed');
   const success = query.get('success');
   
   return (
      <>
         <div className="verification">
            {
               failed && <>
                  <span className="title">
                     Verification link is expired or<br />
                     has already been used
                  </span>
                  <div className="content">
                     <span className="text">Need Help?</span> 
                     <Button
                        type="secondary"
                        size="medium-large"
                        background="transparent"
                        textColor="blue"
                        onClick={()=>{history.push('/?contact=true')}}
                     >
                        Contact us
                     </Button>
                  </div>
               </>
            }
         </div>
         {
            success && <>
               <FailedModal
                  heading={'Email Verified'}
                  description={'Great! Now you can login enjoy Performlive.'}
                  onConfirmCallBack={()=>{history.push('/')}}
               />
            </>
         }
      </>
   )
}

export default Verification;