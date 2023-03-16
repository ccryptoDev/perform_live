import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import Button from 'app/components/Common/Button';
import './styles.scss';

const useOptions = () => {
  const options = {
    style: {
      base: {
        background: '#fff',
        fontSize: '18px',
        color: '#000',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
      hidePostalCode: true,
    },
  };

  return options;
};

const StripeCardForm = ({
  btnTitle = '',
  onSubmit = () => null,
  btnActive,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    onSubmit(payload);
  };

  const isActiveBtn = stripe && btnActive;

  return (
    <form className="stripecardform" onSubmit={handleSubmit}>
      <CardElement
        className="stripecardinput"
        options={options}
        onReady={() => null}
        onChange={() => null}
        onBlur={() => null}
        onFocus={() => null}
      />
      <Button
        size="large"
        background="transparent"
        className="stripecard__btn"
        btnType="submit"
        disabled={!isActiveBtn}
      >
        {btnTitle}
      </Button>
    </form>
  );
};

export default StripeCardForm;
