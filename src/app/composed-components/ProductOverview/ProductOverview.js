import React from 'react';
import PropTypes from 'prop-types';
import './ProductOverview.scss';

import ProductGalleryItem from '../../components/ProductGalleryItem';
import ProductModal from '../../components/Common/ProductModal/ProductModal';
import { beautifyPrice } from '../../utils/numbers';
import useApi from '../../hooks/api';
import { useQuery } from 'react-query';

const ProductOverview = props => {
  const { productOverview } = props;
  const { getPaymentPriceEarn } = useApi('payment');

  const { data: sellerPrice = {} } = useQuery(
    ['productSellerPrice', productOverview.id],
    () => getPaymentPriceEarn(productOverview.price),
  );

  return (
    <ProductModal
      title="Product overview"
      onClose={props.onClose}
      steps={false}
      className="product-overview"
    >
      <div className="product-overview__gallery-lists">
        {productOverview.gallery &&
          productOverview.gallery
            .filter(el => el)
            .map((file, index) => (
              <ProductGalleryItem
                file={file}
                key={`file_${index}`}
                isCover={index === 0}
                imageNumber={index}
              />
            ))}
      </div>

      <div className="product-overview__product-detail">
        <div className="product-detail__text">
          <div className="product-detail__title">{productOverview.name}</div>
          <div className="product-detail__price">
            ${beautifyPrice(productOverview.price)}
          </div>
        </div>

        <div className="product-detail__sub-text">
          <div className="product-detail__sub-title">
            <span className="product-detail__stock">
              {productOverview.stock} in stock
            </span>
            {/* <span className="inventory">Inventory №: 0001234457</span> */}
          </div>
          <div className="product-detail__get">
            you earn ${sellerPrice.price}
          </div>
        </div>

        <div className="product-detail__info">{productOverview.details}</div>
      </div>

      <div className="product-overview__action-btn">{props.children}</div>
    </ProductModal>
  );
};

ProductOverview.propTypes = {
  productOverview: PropTypes.object,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ProductOverview;
