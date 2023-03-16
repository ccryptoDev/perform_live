import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import BinIcon from './bin.svg';
import './ProductSmallCard.scss';
import Button from '../Common/Button';
import { useResizeImage } from '../../hooks/useResizeImage';

const ProductSmallCard = ({
  product,
  onDelete,
  draft,
  onEdit,
  onClick = () => null,
}) => {
  const img = useResizeImage();

  return (
    <div
      role="button"
      className="product-small-card"
      onClick={() => onClick(product)}
      onKeyPress={() => onClick(product)}
      tabIndex="0"
    >
      <div className="product-small-card__image-container">
        <img
          className="product-small-card__image"
          src={img(_get(product, 'gallery[0].url'), 400)}
          alt="card cover"
        />
        <div className="product-small-card__darker-top" />
        <div className="product-small-card__darker-bottom" />
        <div className="product-small-card__price-tag">$ {product.price}</div>
        {draft && (
          <button
            onClick={() => onDelete(product.id)}
            className="product-small-card__delete"
          >
            <img src={BinIcon} alt="delete icon" />
          </button>
        )}
      </div>
      {draft && <Button onClick={() => onEdit(product)}>FINISH</Button>}
      <div className="product-small-card__title">{product.name}</div>
      <div className="product-small-card__stock">{product.stock} in stock</div>
    </div>
  );
};

ProductSmallCard.propTypes = {
  product: PropTypes.object,
};

export default ProductSmallCard;
