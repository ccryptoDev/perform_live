import React from 'react';
import PropTypes from 'prop-types';

import SidebarHeader from '../../SidebarHeader/SidebarHeader';
import SidebarTotal from '../SidebarTotal/SidebarTotal';
import CartItemOrderView from '../CartItemOrderView/CartItemOrderView';
import Button from '../../../../../../../../components/Common/Button';
import { getUserName } from '../../../../../../../../utils/getUserName';

const OrderDetails = ({
  cart,
  onClose,
  cartPrice,
  orderInfo,
  performanceData,
}) => {
  return (
    <div className="sidebar-cart sidebar-order-details">
      <SidebarHeader title="Thanks for order" onClose={onClose} />

      {orderInfo && (
        <div className="sidebar-order-details__info">
          <div className="h4">Your transaction processed successfully.</div>
          <div className="f-body-15">Order #{orderInfo.orderId}</div>
        </div>
      )}

      <div className="sidebar-order__items">
        {cart.map(cartItem => (
          <CartItemOrderView cartItem={cartItem} key={cartItem.product.id} />
        ))}
      </div>

      <SidebarTotal cartPrice={cartPrice} noInfo>
        <div className="sidebar-order-details__info">
          <div className="f-body-15">Thanks for shopping with me!</div>
          <div className="f-body-15">Check out more products! </div>
        </div>

        <Button
          size="large"
          className="sidebar-cart__checkout-btn"
          onClick={onClose}
        >
          Continue
        </Button>
      </SidebarTotal>
    </div>
  );
};

OrderDetails.propTypes = {};

export default OrderDetails;
