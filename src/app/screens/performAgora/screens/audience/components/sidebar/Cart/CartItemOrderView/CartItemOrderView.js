import React from 'react';
import PropTypes from 'prop-types';
import './CartItemOrderView.scss';

const CartItemOrderView = ({ cartItem: { product, quantity } }) => {
  return (
    <div className="cart-item-order-view">
      <div className="cart-item-order-view__image">
        <img src={product.gallery && product.gallery[0].url} alt="product1" />
      </div>

      <div className="cart-item-order-view__info">
        <div className="cart-item-order-view__product-detail h4">
          {product.name}
        </div>
      </div>

      <div className="cart-item-order-view__right">
        <div className="cart-item-order-view__right-price f-body-15">
          $ {product.price}
        </div>
        <div className="cart-item-order-view__right-quantity">x {quantity}</div>
      </div>
    </div>
  );
};
CartItemOrderView.propTypes = {
  product: PropTypes.object,
};
export default CartItemOrderView;
