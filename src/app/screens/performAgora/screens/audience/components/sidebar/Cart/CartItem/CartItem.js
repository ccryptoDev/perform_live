import React from 'react';
import PropTypes from 'prop-types';
import './CartItem.scss';
import SmallCountSelector from './SmallCountSelector';
import Dustbin from './Dustbin.svg';

const CartItem = ({
  cartItem: { product, quantity },
  changeProductQuantity,
  removeProduct,
}) => {
  const splitPrice = product.price.split(':');
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={product.gallery && product.gallery[0].url} alt="product1" />
      </div>

      <div className="cart-item__info">
        <div className="cart-item__info-top">
          <div className="cart-item__price">
            $ {splitPrice[0]}.<small>{splitPrice[1] || '00'}</small>
          </div>
          <div className="cart-item__product-detail h5">{product.details}</div>
        </div>
        <SmallCountSelector
          value={quantity}
          incrementCount={() => changeProductQuantity(product.id, quantity + 1)}
          decrementCount={() => changeProductQuantity(product.id, quantity - 1)}
        />
      </div>
      <div className="cart-item__close-container">
        <img
          src={Dustbin}
          alt="delete product"
          onClick={() => removeProduct(product.id)}
        />
      </div>
    </div>
  );
};
CartItem.propTypes = {
  product: PropTypes.object,
};
export default CartItem;
