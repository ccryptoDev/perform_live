import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/Common/Button';
import cn from 'classnames';

const ProductItem = ({
  openDetail,
  productInfo,
  isFocused,
  addProductToCart,
}) => {
  const splitPrice = productInfo.price.split(':');
  const [isArHovered, setIsArHovered] = useState(false);
  return (
    <>
      <div className="product">
        <div className={cn('product-logo', { focused: isFocused !== -1 })}>
          <img
            className="product-img"
            src={productInfo.gallery && productInfo.gallery[0].url}
            alt="product1"
          />
        </div>

        <div className="product-info">
          <div className="flex-column">
            <div className="price-text">
              <div className="price">
                <span className="new">
                  ${splitPrice[0]}.<small>{splitPrice[1] || '00'}</small>
                </span>
              </div>
              <div
                className="more"
                onClick={openDetail}
                onKeyPress={openDetail}
                role="button"
                tabIndex="0"
              >
                More
              </div>
            </div>
            <div className="product-detail">{productInfo.details}</div>
          </div>

          <div className="btn-group">
            <div
              onMouseOver={() => setIsArHovered(s => !s)}
              onMouseOut={() => setIsArHovered(s => !s)}
              className="ar-btn"
            >
              {isArHovered ? (
                <Button
                  fontSize="10px"
                  background="glassy-white"
                  textColor="blue"
                >
                  Coming soon
                </Button>
              ) : (
                <Button
                  fontSize="10px"
                  background="transparent"
                  border="gradient"
                >
                  Try with AR
                </Button>
              )}
            </div>
            <Button
              fontSize="10px"
              onClick={() => addProductToCart(productInfo)}
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
ProductItem.propTypes = {
  productInfo: PropTypes.object,
  openDetail: PropTypes.func,
};
export default ProductItem;
