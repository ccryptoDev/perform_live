import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from 'app/hooks/api';
import { useMutation, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import ProductModal from '../../components/Common/ProductModal/ProductModal';
import DateBadge from '../../components/DateBadge/DateBadge';
import TimeBadge from '../../components/TimeBadge/TimeBadge';
import CircularSpinner from '../../components/CircularSpinner/CircularSpinner';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import './RegisterForPaidPerformanceModal.scss';
import Checkbox from '../../components/Inputs/Checkbox';
import Button from '../../components/Common/Button';
import AddStripeCard from '../AddStripeCard/AddStripeCard';
import TermsAndPrivacyText from '../../components/TermsAndPrivacyText/TermsAndPrivacyText';

export const RegisterForPaidPerformanceModal = ({
  performance = {},
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [cardInfo, setCardInfo] = useState();
  const [agree, setAgree] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    name,
    startDateTime,
    endDateTime,
    participationPurchase,
  } = performance;
  const price = _get(participationPurchase, 'price');
  const { postPaymentPerformanceIdPaymentForInstant } = useApi('payment');
  const payForPerformance = useMutation(
    ({ id, paymentFor, paymentMethod }) =>
      postPaymentPerformanceIdPaymentForInstant(id, paymentFor, {
        paymentMethod,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('performancesWithAccess');

        setShowSuccessModal(true);
      },
    },
  );
  const handleRegister = () => {
    setSpinner(true);
    payForPerformance.mutate({
      id: performance.id,
      paymentFor: 'access',
      paymentMethod: cardInfo.paymentMethod,
    });
  };

  return !showSuccessModal ? (
    <ProductModal
      title="Join now!"
      subtitle={name}
      steps={false}
      className="register-for-paid-performance"
      onClose={onClose}
    >
      {spinner ? (
        <div className="spinner-container">
          <CircularSpinner />
        </div>
      ) : (
        <>
          <div className="register-for-paid-performance__row">
            <DateBadge date={startDateTime} />
            <TimeBadge startDate={startDateTime} endDate={endDateTime} />
          </div>
          <div className="register-for-paid-performance__row register-for-paid-performance__total-row">
            <div className="total-row__title">Total</div>
            <div className="total-row__price h3">${price}</div>
          </div>
          <div className="register-for-paid-performance__row flex-column">
            <div className="h4">Payment method</div>
            <AddStripeCard onChange={setCardInfo} cardInfo={cardInfo} />
          </div>
          <div className="register-for-paid-performance__row no-border">
            <Checkbox
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              className="register-for-paid-performance__agree"
            />
            <TermsAndPrivacyText />
          </div>
          <div className="register-for-paid-performance__btn-row">
            <Button
              background="transparent"
              size="large"
              border="gradient"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegister}
              size="large"
              disabled={!cardInfo || !agree}
            >
              Register
            </Button>
          </div>
        </>
      )}
    </ProductModal>
  ) : (
    <ConfirmModal
      title="Success"
      subtitle="You have successfully registered to Best tools for your culinary skills "
    >
      <Button onClick={onClose}>to home screen</Button>
    </ConfirmModal>
  );
};

RegisterForPaidPerformanceModal.propTypes = {
  performance: PropTypes.object,
  onClose: PropTypes.func,
};

export default RegisterForPaidPerformanceModal;
