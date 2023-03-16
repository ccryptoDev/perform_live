/**
 *
 * PaymentShipping container
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { useQuery, useQueryClient } from 'react-query';

import Visa from 'assets/svg/visa.svg';
import Mastercard from 'assets/svg/mastercard.svg';
import Card from 'assets/svg/card.svg';
import { useApi } from 'app/hooks/api';
import Loader from 'app/components/Loader';
import {
  AddBtn,
  UserDataPreview,
  FieldCardBox,
  StripeCardForm,
  ShippingInfoForm,
} from 'app/components';
import plToast from 'app/utils/toast';
import { prepareShippingInfoForReq, parsePaymentMethodData } from 'app/utils';
import { defaultAction } from './state/paymentShipping.actions';
import reducer from './state/paymentShipping.reducer';
import saga from './state/paymentShipping.saga';
import { injectReducer, injectSaga } from './paymentShipping.dependencies';

import './paymentShipping.scss';

const cardBrandIcon = {
  visa: Visa,
  mastercard: Mastercard,
};

const baseCardData = { cardBrand: null, card4Num: null };

export const PaymentShipping = () => {
  const queryClient = useQueryClient();

  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardData, setCardData] = useState(baseCardData);
  const [spinner, setSpinner] = useState(false);
  const [isVisibleShippingInfoForm, setVisibleShippingInfoForm] = useState(
    false,
  );
  const [isAddedAddress, setAddedAddress] = useState(false);
  const [isVisibleAddAddress, setVisibleAddAddress] = useState(true);
  const [shippingTitleContainer, setTitleContainer] = useState(
    'Shipping Address',
  );
  const [customerId, setCustomerId] = useState(null);

  const {
    getPaymentCustomer,
    postPaymentCustomer,
    getPaymentCustomerShipping,
    postPaymentCustomerShipping,
    putPaymentCustomerShipping,
    getPaymentCustomerPaymentMethod,
    postPaymentCustomerPaymentMethod,
    deletePaymentCustomerPaymentMethodIdId: deletePaymentCustomerPaymentMethod,
  } = useApi('payment');

  const { data: shippingAddress } = useQuery(
    'shippingAddress',
    () => getPaymentCustomerShipping(),
    {
      onError: () => {
        setVisibleAddAddress(true);
        setAddedAddress(false);
      },
      onSuccess: () => {
        setVisibleAddAddress(false);
        setAddedAddress(true);
      },
      refetchOnWindowFocus: false,
      retryOnMount: true,
      retry: 1,
    },
  );

  useQuery('paymentMethodResponse', () => getPaymentCustomerPaymentMethod(), {
    onError: () => {
      setCardData(baseCardData);
    },
    onSuccess: data => {
      const { brand, last4 } = parsePaymentMethodData(data[0]);
      if (last4 && brand) {
        setCardData({ cardBrand: brand, card4Num: last4 });
        setPaymentMethodId(data[0].id);
        setPaymentMethod(data[0].paymentMethod);
      }
    },
    refetchOnWindowFocus: false,
    retryOnMount: true,
    retry: 1,
  });

  useQuery('customerData', () => getPaymentCustomer(), {
    onSuccess: data => {
      setCustomerId(data.customerId);
    },
    onError: async () => {
      const response = await postPaymentCustomer();
      queryClient.invalidateQueries('customerData');
      setCustomerId(response.customerId);
    },
    refetchOnWindowFocus: false,
    retryOnMount: true,
    retry: 1,
  });

  const addNewAddress = () => {
    setVisibleShippingInfoForm(true);
    setTitleContainer('Shipping Info');
  };

  const editAddress = () => {
    setVisibleShippingInfoForm(true);
  };

  const onShippingInfoFormSubmit = async values => {
    const payload = prepareShippingInfoForReq(values);
    try {
      setSpinner(true);

      if (!isAddedAddress) {
        await postPaymentCustomerShipping(payload);
        setAddedAddress(true);
      } else {
        await putPaymentCustomerShipping(payload);
      }

      setVisibleShippingInfoForm(false);
    } catch (error) {
      plToast.error(`Can't add your address`);
      setVisibleShippingInfoForm(false);
      setAddedAddress(false);
    } finally {
      queryClient.invalidateQueries('shippingAddress');
      setSpinner(false);
    }
  };

  const onCardSubmit = async paymentMethodData => {
    setSpinner(true);
    let payload;

    if (paymentMethodData.error) {
      plToast.error(`Wrong card format`);
      setSpinner(false);
      return;
    }

    try {
      const methodId = String(paymentMethodData.paymentMethod.id);
      payload = {
        paymentMethod: methodId,
      };
    } catch (e) {
      plToast.error(`Something wrong, please try again later`);
      setSpinner(false);
      return;
    }

    try {
      const prevPaymentMethod = await getPaymentCustomerPaymentMethod();
      if (prevPaymentMethod.length > 0) {
        plToast.error(`Your card already added`);
        setSpinner(false);
        return;
      }
    } catch (e) {
      plToast.error(`Please try again late`);
      setSpinner(false);
      return;
    }

    try {
      const response = await postPaymentCustomerPaymentMethod(payload);
      setCardData({ cardBrand: response.brand, card4Num: response.last4 });
      setPaymentMethodId(response.id);
      setPaymentMethod(response.paymentMethod);
    } catch (e) {
      plToast.error(`Can't add your card`);
    } finally {
      queryClient.invalidateQueries('paymentMethodData');
      setSpinner(false);
    }
  };

  const onEditCardData = async () => {
    try {
      setCardData(baseCardData);
      await deletePaymentCustomerPaymentMethod(paymentMethodId);
    } catch (e) {
      plToast.error(`Please try again late`);
      const res = await postPaymentCustomerPaymentMethod(paymentMethod);
      setPaymentMethodId(res.id);
      setCardData({ cardBrand: res.brand, card4Num: res.last4 });
    }
  };

  const cardIcon =
    cardBrandIcon[String(cardData.cardBrand).toLowerCase()] || Card;

  return (
    <div className="paymentshipping-container">
      <div className="paymentshippingcontent-container">
        <div className="content">
          <div className="card">
            <div>
              <h1 className="card-title">{shippingTitleContainer}</h1>
            </div>
            {!isVisibleAddAddress &&
              !isVisibleShippingInfoForm && (
                <UserDataPreview data={shippingAddress} onEdit={editAddress} />
              )}
            {!isVisibleShippingInfoForm &&
              isVisibleAddAddress && (
                <div className="">
                  <AddBtn title="New address" onClick={addNewAddress} />
                </div>
              )}
            {isVisibleShippingInfoForm && (
              <div className="cardform-container">
                <ShippingInfoForm
                  data={shippingAddress}
                  onSubmit={onShippingInfoFormSubmit}
                  onCancel={() => setVisibleShippingInfoForm(false)}
                />
              </div>
            )}
          </div>
          <div className="card">
            <div>
              <h1 className="card-title">Payment Method</h1>
            </div>
            <div className="stripeelement-container">
              {!(cardData.card4Num && cardData.cardBrand) && (
                <StripeCardForm
                  btnTitle="Add Card"
                  onSubmit={onCardSubmit}
                  btnActive
                />
              )}
              {spinner && <Loader />}
              {!spinner &&
                (cardData.card4Num && cardData.cardBrand) && (
                  <FieldCardBox
                    icon={cardIcon}
                    onEdit={onEditCardData}
                    value={cardData.card4Num}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentShipping.propTypes = {
  defaultState: PropTypes.any,
  defaultAction: PropTypes.func,
};

const mapStateToProps = state => ({
  defaultState: _get(state.paymentshipping, 'defaultState', null),
});

const mapDispatchToProps = dispatch => ({
  defaultAction: payload => dispatch(defaultAction(payload)),
});

const withReducer = injectReducer({ key: 'paymentshipping', reducer });
const withSaga = injectSaga({ key: 'paymentshipping', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PaymentShipping);
