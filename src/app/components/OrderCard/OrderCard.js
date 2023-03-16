import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Common/Button';
import { orderStatuses } from '../../common';

import './OrderCard.scss';

export const OrderCard = ({
  items = [],
  fulledBtnClick,
  fulledBtnTitle,
  transparentBtnClick,
  transparentBtnTitle,
}) => (
  <>
    <div className="order-card-header">
      {items.length > 1
        ? `${items.length} Products Ordered`
        : `${items.length} Product Ordered`}
    </div>
    {items.map(({ product, quantity, status }, index) => {
      const statusValue = orderStatuses[status];
      return (
        <div
          key={`${index},${product.price},${quantity},${product.name}`}
          className="ordered-list__row bottom-line"
        >
          <div className="ordered-list__image-container">
            <img src={product.gallery[0].url} alt="product" />
          </div>
          <div className="ordered-list__content">
            <div className="ordered-list__content-title">{product.name}</div>
            {statusValue && (
              <div className="ordered-list__content-status">
                Status: <span className="text-uppercase">{statusValue}</span>
              </div>
            )}
            {transparentBtnClick && (
              <Button
                type="secondary"
                textColor="blue"
                background="transparent"
                className="steps__btn"
                fontSize="14px"
                onClick={transparentBtnClick}
              >
                <span>{transparentBtnTitle}</span>
              </Button>
            )}
            {fulledBtnClick && (
              <Button
                className="order-view__shipping-label"
                fontSize="10px"
                onClick={() => fulledBtnClick(product.id)}
              >
                {fulledBtnTitle}
              </Button>
            )}
          </div>
          <div className="ordered-list__content">
            <div className="ordered-list__price">{`$${Number(
              product.price,
            ).toFixed(2)}`}</div>
            <div className="ordered-list__content-quantity">
              <span className="quantity-wrap">x {quantity}</span>
            </div>
          </div>
        </div>
      );
    })}
  </>
);

OrderCard.propTypes = {
  items: PropTypes.array,
};

export default OrderCard;
