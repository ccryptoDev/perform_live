import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './OrderCard.scss';

export const OrderCard = ({ items }) => (
  <>
    {items.map(({ product, quantity }, index) => (
      <div
        key={`${index},${product.price},${quantity},${product.name}`}
        className="ordered-list__row bottom-line"
      >
        <div className="ordered-list__image-container">
          <img
            src={
              'https://purr.objects-us-east-1.dream.io/i/hoC0F.jpg' ||
              product.gallery[0].url
            }
            alt="product"
          />
        </div>
        <div className="ordered-list__content">
          <div className="ordered-list__content-title">{product.name}</div>
          <div className="ordered-list__content-quantity">
            {quantity} {quantity > 1 ? `items` : `item`}
          </div>
        </div>
        <div className="ordered-list__price">{`$${product.price}`}</div>
      </div>
    ))}
  </>
);

OrderCard.propTypes = {
  items: PropTypes.array,
};

export default OrderCard;
