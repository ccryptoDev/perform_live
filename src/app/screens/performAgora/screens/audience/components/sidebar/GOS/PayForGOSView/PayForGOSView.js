import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import SidebarHeader from '../../SidebarHeader/SidebarHeader';
import AddStripeCard from '../../../../../../../../composed-components/AddStripeCard';
import Button from '../../../../../../../../components/Common/Button';
import Checkbox from '../../../../../../../../components/Inputs/Checkbox';
import useApi from '../../../../../../../../hooks/api';
import SidebarSpinner from '../../SidebarSpinner/SidebarSpinner';
import { firebaseUtils } from '../../../../../../../../utils/firebaseUtils';
import TermsAndPrivacyText from '../../../../../../../../components/TermsAndPrivacyText/TermsAndPrivacyText';

const PayForGOSView = ({ performanceData, setCurrentSidebarView }) => {
  const [cardInfo, setCardInfo] = useState();
  const [authorize, setAuthorize] = useState(false);
  const [agree, setAgree] = useState(false);
  const { postPaymentPerformanceIdPaymentForInstant } = useApi('payment');
  const userInfo = useSelector(state => state.global.userInfo);

  const payForGOS = useMutation(
    ({ id, paymentFor, paymentMethod }) =>
      postPaymentPerformanceIdPaymentForInstant(id, paymentFor, {
        paymentMethod,
      }),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries('performancesWithAccess');
        // setShowSuccessModal(true);
        firebaseUtils.joinStage(performanceData.performer.id, userInfo);
        setCurrentSidebarView('gosSuccess');
      },
    },
  );

  const handlePay = () => {
    payForGOS.mutate({
      id: performanceData.id,
      paymentFor: 'stage',
      paymentMethod: cardInfo.paymentMethod,
    });
  };

  return (
    <div className="sidebar-cart pay-gos">
      <SidebarHeader
        title="Join the stage"
        onClose={() => setCurrentSidebarView('main')}
      />
      <div className="pay-gos__content">
        <div className="pay-gos__total-row">
          <div className="f-body-15">Total</div>
          <div className="h3">${performanceData.stagePurchase.price}</div>
        </div>

        <div className="pay-gos__payment-row">
          <div className="h4">Payment method</div>
          <AddStripeCard onChange={setCardInfo} cardInfo={cardInfo} />
        </div>

        <div className="pay-gos__agreee-row">
          <Checkbox
            checked={authorize}
            onChange={e => setAuthorize(e.target.checked)}
          />
          <p className="f-body-14">
            I authorize the payment for this transaction will be processed
            immediately. Performer will receive your payment you have concluded
            your session On Stage.
          </p>
        </div>

        <div className="pay-gos__agreee-row">
          <Checkbox
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
          />
          <TermsAndPrivacyText />
        </div>

        <Button
          onClick={handlePay}
          disabled={!authorize || !agree || !cardInfo}
        >
          COMPLETE PAYMENT
        </Button>

        {payForGOS.isLoading && (
          <SidebarSpinner message="Your payment is being processes" />
        )}
      </div>
    </div>
  );
};

PayForGOSView.propTypes = {};

export default PayForGOSView;
