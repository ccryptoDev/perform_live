import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { FieldCardBox, StripeCardForm } from 'app/components';
import './AddStripeCard.scss';
import { useQuery, useQueryClient } from 'react-query';
import Visa from 'assets/svg/visa.svg';
import Mastercard from 'assets/svg/mastercard.svg';
import { useApi } from 'app/hooks/api';
import Loader from 'app/components/Loader';
import plToast from 'app/utils/toast';
import Card from 'assets/svg/card.svg';
import { parsePaymentMethodData } from 'app/utils';

const cardBrandIcon = {
  visa: Visa,
  mastercard: Mastercard,
};
export const AddStripeCard = ({
  disabled,
  cardInfo = {},
  onChange = () => {},
}) => {
  const queryClient = useQueryClient();
  const { cardAdded, last4, brand, paymentMethodId, paymentMethod } = cardInfo;

  const [spinner, setSpinner] = useState(false);

  const {
    getPaymentCustomer,
    postPaymentCustomer,
    getPaymentCustomerPaymentMethod,
    postPaymentCustomerPaymentMethod,
    deletePaymentCustomerPaymentMethodIdId: deletePaymentCustomerPaymentMethod,
  } = useApi('payment');

  useQuery('paymentMethodResponse', () => getPaymentCustomerPaymentMethod(), {
    onError: () => onChange({}),
    onSuccess: data => {
      const { brand, last4 } = parsePaymentMethodData(data[0]);
      if (last4 && brand) {
        onChange({
          cardAdded: true,
          last4,
          brand,
          paymentMethodId: data[0].id,
          paymentMethod: data[0].paymentMethod,
        });
      }
    },
    refetchOnWindowFocus: false,
    retryOnMount: true,
    retry: 1,
  });

  const onCardSubmit = async paymentMethodData => {
    if (!paymentMethodData.paymentMethod) {
      return;
    }
    setSpinner(true);

    // check if user a customer
    try {
      await getPaymentCustomer();
    } catch (err) {
      await postPaymentCustomer();
    }

    const { brand, last4 } = parsePaymentMethodData(paymentMethodData);
    const methodId = String(paymentMethodData.paymentMethod.id);
    const payload = {
      paymentMethod: methodId,
    };

    try {
      const prevPaymentMethod = await getPaymentCustomerPaymentMethod();
      if (prevPaymentMethod.length > 0) {
        plToast.error(`Your card already added`);
        setSpinner(false);
        return;
      }
    } catch (e) {
      plToast.error(`Please try again later`);
    }

    try {
      const response = await postPaymentCustomerPaymentMethod(payload);
      onChange({
        cardAdded: true,
        last4,
        brand,
        paymentMethodId: response.id,
        paymentMethod: response.paymentMethod,
      });
    } catch (e) {
      plToast.error(`Can't add your card`);
    } finally {
      queryClient.invalidateQueries('paymentMethodData');
      setSpinner(false);
    }
  };

  const onEditCardData = async () => {
    try {
      await deletePaymentCustomerPaymentMethod(paymentMethodId);
      onChange();
    } catch (e) {
      plToast.error(`Please try again late`);
    }
  };

  const cardIcon = cardBrandIcon[String(brand).toLowerCase()] || Card;

  return (
    <div className="stripeelement-container">
      {!cardAdded && (
        <StripeCardForm
          btnTitle="Add Card"
          onSubmit={onCardSubmit}
          btnActive={!disabled}
        />
      )}
      {spinner && <Loader />}
      {!spinner &&
        cardAdded && (
          <FieldCardBox icon={cardIcon} onEdit={onEditCardData} value={last4} />
        )}
    </div>
  );
};

AddStripeCard.propTypes = {};

export default AddStripeCard;
