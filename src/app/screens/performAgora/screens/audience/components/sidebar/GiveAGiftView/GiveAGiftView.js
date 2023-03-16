import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import AddStripeCard from '../../../../../../../composed-components/AddStripeCard';
import Button from '../../../../../../../components/Common/Button';
import Checkbox from '../../../../../../../components/Inputs/Checkbox';
import { useMutation } from 'react-query';
import useApi from '../../../../../../../hooks/api';
import plToast from '../../../../../../../utils/toast';
import SidebarSpinner from '../SidebarSpinner/SidebarSpinner';
import TermsAndPrivacyText from '../../../../../../../components/TermsAndPrivacyText/TermsAndPrivacyText';

const GiveAGiftView = ({
  performanceId,
  handleViewChange,
  performanceData,
}) => {
  const [cardInfo, setCardInfo] = useState();
  const [gift, setGift] = useState(performanceData.giftPurchases[0]);
  const [agree, setAgree] = useState(false);
  const { postPaymentPerformanceIdPaymentForInstant } = useApi('payment');
  const payForGift = useMutation(
    ({ id, paymentFor, paymentMethod }) =>
      postPaymentPerformanceIdPaymentForInstant(id, paymentFor, {
        paymentMethod,
        purchaseId: gift.id,
      }),
    {
      onSuccess: () => {
        handleViewChange('giftSuccess');
      },
      onError: res => {
        plToast.error(res.data.message);
      },
    },
  );
  const handleGiveAGift = () => {
    payForGift.mutate({
      id: performanceId,
      paymentFor: 'gift',
      paymentMethod: cardInfo.paymentMethod,
    });
  };

  const onClose = () => handleViewChange('main');

  return (
    <div className="sidebar-cart give-a-gift">
      <SidebarHeader title="Give a gift" onClose={onClose} />

      <div className="give-a-gift__content">
        <div className="performance-sidebar__section">
          <div className="h4">Choose amount</div>
          <div className="give-a-gift__amount-options">
            {performanceData.giftPurchases.map(giftItem => (
              <Button
                key={giftItem.label}
                background="transparent"
                border={gift.id === giftItem.id ? 'gradient' : 'gray'}
                size="medium"
                onClick={() => setGift(giftItem)}
              >
                {giftItem.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="performance-sidebar__section give-a-gift__total">
          <div className="f-body-15">Total</div>
          <div className="h3">$ {gift.price}</div>
        </div>

        <div className="performance-sidebar__section">
          <div className="h4">Payment method</div>

          <div className="give-a-gift__cart-wrapper">
            <AddStripeCard onChange={setCardInfo} cardInfo={cardInfo} />
          </div>
        </div>

        <div className="performance-sidebar__section give-a-gift__confirm">
          <Checkbox
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
          />
          <TermsAndPrivacyText />
        </div>

        <Button
          onClick={handleGiveAGift}
          disabled={!cardInfo || !agree || gift.id === undefined}
        >
          GIVE A GIFT
        </Button>

        {payForGift.isLoading && (
          <SidebarSpinner message="Your payment is being processed" />
        )}
      </div>
    </div>
  );
};

GiveAGiftView.propTypes = {};

export default GiveAGiftView;
