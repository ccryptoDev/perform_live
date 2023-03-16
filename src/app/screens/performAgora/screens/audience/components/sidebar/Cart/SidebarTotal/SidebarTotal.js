import React from 'react';
import PropTypes from 'prop-types';

const SidebarTotal = ({ cartPrice, children, noInfo }) => {
  const { processing, shipping, subtotal, total } = cartPrice;

  return (
    <div className="sidebar-cart__total">
      <div className="sidebar-cart__total-row">
        <div className="total-row__title">Subtotal</div>
        <div className="total-row__value">$ {subtotal}</div>
      </div>
      <div className="sidebar-cart__total-row">
        <div className="total-row__title">Taxes</div>
        <div className="total-row__value">$ 0</div>
      </div>
      <div className="sidebar-cart__total-row">
        <div className="total-row__title">Shipping</div>
        <div className="total-row__value">$ {shipping}</div>
      </div>
      <div className="sidebar-cart__total-row">
        <div className="total-row__title">Processing</div>
        <div className="total-row__value">$ {processing}</div>
      </div>
      <div className="sidebar-cart__total-row-total">
        <div className="total-row__total-title">Total</div>
        <div className="total-row__total-value">$ {total}</div>
      </div>

      {!noInfo && (
        <>
          <p className="sidebar-cart__info-text">
            Items in your cart may become unavailable. To ensure your order is
            processed successfully, complete checkout.
          </p>
          <p className="sidebar-cart__info-text">
            Taxes and shipping cost are subject to adjustment based on shipping
            address.
          </p>
        </>
      )}
      {children}
    </div>
  );
};

SidebarTotal.propTypes = {};

export default SidebarTotal;
