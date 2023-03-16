import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prepareShippingInfoForReq } from 'app/utils';
import { useQuery, useQueryClient } from 'react-query';
import cn from 'classnames';

import SidebarHeader from '../../SidebarHeader/SidebarHeader';
import SidebarTotal from '../SidebarTotal/SidebarTotal';
import Button from '../../../../../../../../components/Common/Button';
import AddBtn from '../../../../../../../../components/AddBtn';
import AddStripeCard from '../../../../../../../../composed-components/AddStripeCard';
import useApi from '../../../../../../../../hooks/api';
import ShippingInfoForm from '../../../../../../../../components/ShippingInfoForm';
import UserDataPreview from '../../../../../../../../components/UserDataPreview';
import plToast from '../../../../../../../../utils/toast';
import SidebarSpinner from '../../SidebarSpinner/SidebarSpinner';

const CheckoutView = ({
  cart,
  performanceId,
  onBack,
  setCurrentSidebarView,
  cartPrice,
  handlePay,
}) => {
  const queryClient = useQueryClient();

  const [cardInfo, setCardInfo] = useState();
  const [shippingAddress, setShippingAddress] = useState(null);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState(false);

  const {
    postPaymentCustomer,
    getPaymentCustomerShipping,
    putPaymentCustomerShipping,
    postPaymentCustomerShipping,
  } = useApi('payment');

  useQuery('shippingAddress', () => getPaymentCustomerShipping(), {
    onSuccess: setShippingAddress,
  });

  const onShippingInfoFormSubmit = async values => {
    const payload = prepareShippingInfoForReq(values);
    try {
      setSpinnerMessage('Updating shipping information');
      await postPaymentCustomer().catch(() => {});

      if (!shippingAddress) {
        const res = await postPaymentCustomerShipping(payload);
        setShippingAddress(res);
      } else {
        const res = await putPaymentCustomerShipping(payload);
        setShippingAddress(res);
      }
      queryClient.invalidateQueries('shippingAddress');
      setShowShippingForm(false);
    } catch (error) {
      plToast.error(`Can't add your address`);
    } finally {
      setSpinnerMessage(null);
    }
  };

  const editAddress = () => {
    setShowShippingForm(true);
  };

  const pay = async () => {
    try {
      setSpinnerMessage('Your payment is being processed');
      await handlePay();
      setCurrentSidebarView('orderDetails');
    } catch (err) {
      plToast.error(err.data.message);
    } finally {
      setSpinnerMessage(null);
    }
  };

  return (
    <div
      className={cn('sidebar-cart', {
        'sidebar-cart--spinner': spinnerMessage,
      })}
    >
      <SidebarHeader title="Checkout" onBack={onBack} />

      <div className="sidebar-cart__shipping">
        <div className="h4">Shipping info</div>
        <div className="sidebar-cart__shipping-add">
          {!shippingAddress &&
            !showShippingForm && (
              <AddBtn
                title="New address"
                onClick={() => setShowShippingForm(true)}
              />
            )}

          {shippingAddress &&
            !showShippingForm && (
              <UserDataPreview data={shippingAddress} onEdit={editAddress} />
            )}

          {showShippingForm && (
            <ShippingInfoForm
              data={shippingAddress || {}}
              onSubmit={onShippingInfoFormSubmit}
              onCancel={() => setShowShippingForm(false)}
            />
          )}
        </div>
        <div className="h4">Payment method</div>
        <AddStripeCard onChange={setCardInfo} cardInfo={cardInfo} />
      </div>

      <SidebarTotal cartPrice={cartPrice}>
        <Button
          size="large"
          className="sidebar-cart__checkout-btn"
          onClick={pay}
          disabled={!shippingAddress || !cardInfo}
        >
          Pay ${cartPrice.total}
        </Button>
      </SidebarTotal>

      {spinnerMessage && <SidebarSpinner message={spinnerMessage} />}
    </div>
  );
};

CheckoutView.propTypes = {};

export default CheckoutView;
