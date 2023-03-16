import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem';
import Button from '../../../../../../../../components/Common/Button';
import SidebarTotal from '../SidebarTotal/SidebarTotal';
import SidebarHeader from '../../SidebarHeader/SidebarHeader';

const SidebarCart = ({
  cart,
  changeProductQuantity,
  removeProduct,
  onCheckout,
  onClose,
  cartPrice,
}) => {
  return (
    <div className="sidebar-cart">
      <SidebarHeader title="My cart" onClose={onClose} />

      <div className="sidebar-cart__items">
        {cart.map(cartItem => (
          <CartItem
            key={cartItem.product.id}
            cartItem={cartItem}
            changeProductQuantity={changeProductQuantity}
            removeProduct={removeProduct}
          />
        ))}
      </div>

      <SidebarTotal cartPrice={cartPrice}>
        <Button
          size="large"
          className="sidebar-cart__checkout-btn"
          onClick={onCheckout}
          disabled={!cart.length}
        >
          CHECKOUT
        </Button>
      </SidebarTotal>
    </div>
  );
};

SidebarCart.propTypes = {};

export default SidebarCart;
