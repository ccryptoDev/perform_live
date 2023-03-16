/**
 *
 * ProductItemPreview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import IMG from 'app/utils/images';
import './ProductItemPreview.scss';

export const ProductItemPreview = ({ productInfo, toggleSelectedProducts }) => (
  <div className="product-item-preview">
    <img
      src={
        productInfo.gallery &&
        productInfo.gallery[0] &&
        productInfo.gallery[0].url
      }
      className="product"
      alt="product"
    />
    <img
      src={IMG.PRODUCT_CLOSE}
      className="close"
      alt="close"
      onClick={() => toggleSelectedProducts(productInfo.id)}
      role="none"
    />
  </div>
);

ProductItemPreview.propTypes = {};

export default ProductItemPreview;
