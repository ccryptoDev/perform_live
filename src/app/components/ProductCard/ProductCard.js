/**
 *
 * ProductCard
 *
 */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.scss';
import Checkbox from '../Inputs/Checkbox';
import { beautifyPrice } from '../../utils/numbers';
import { useResizeImage } from '../../hooks/useResizeImage';

const ProductCard = ({ product, checked, onCheck, onViewProductClick }) => {
  const handleSelect = useCallback(() => onCheck(product.id), [onCheck]);
  const img = useResizeImage();

  return (
    <div className="product-card">
      <img
        src={img(
          product.gallery && product.gallery[0] && product.gallery[0].url,
          200,
        )}
        className="product-img"
        alt="product background"
      />
      <div className="product-card__detail">
        <div className="product-info">
          <div className="start">
            <span className="price">${beautifyPrice(product.price)}</span>
          </div>
          <div className="flex-end">
            <span className="stock">{product.stock} in stock</span>

            <Checkbox
              onChange={handleSelect}
              checked={checked}
              className="check"
            />
          </div>
        </div>

        <div className="product-card__name">
          <span>{product.name}</span>
          <span className="view-product" onClick={onViewProductClick}>
            View product
          </span>
        </div>
        <div className="product-card__description">{product.details}</div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  selectedProducts: PropTypes.array,
  onProductClick: PropTypes.func,
  onViewProductClick: PropTypes.func,
};

export default ProductCard;
