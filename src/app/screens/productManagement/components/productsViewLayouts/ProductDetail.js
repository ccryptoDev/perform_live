import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IMG } from '../../productManagement.dependencies';
import Button from '../../../../components/Common/Button';
import CloseIcon from '../../../../../assets/svg/btns/close.svg';
import { beautifyPrice } from '../../../../utils/numbers';

const ProductDetail = ({ onBack, productInfo, addProductToCart }) => {
  return (
    <>
      <div className="product-description">
        <div className="description-head">
          <h3 className="description-title h3">Product Overview</h3>
          <Button
            size="default"
            background="glassy-white"
            className="circle-btn"
            onClick={onBack}
            suffix={<img src={CloseIcon} alt="close icon" />}
          />
        </div>
        <div className="product-avatar">
          <img
            className="product-img"
            src={productInfo.gallery && productInfo.gallery[0].url}
            alt="product back"
          />
        </div>
        <div className="product-info">
          <div className="product-price">
            <span className="new">${beautifyPrice(productInfo.price)}</span>
          </div>
          <div className="product-name">{productInfo.name}</div>
          <div className="product-notes">{productInfo.details}</div>
          {/* <div className="count-product">
            <span>Qty</span>
            <div className="counter-btn">
              <Link to="#" className="min-btn">
                -
              </Link>
              <span>1</span>
              <Link to="#" className="plus-btn">
                +
              </Link>
            </div>
          </div> */}
          <Button
            background="transparent"
            border="gradient"
            size="large"
            onClick={() => {}}
            prefix={<img className="tryar-icon" src={IMG.TRYAR} alt="Try QR" />}
            suffix={<span>coming soon</span>}
            className="ar-btn"
          >
            Try in AR
          </Button>
          <Button
            onClick={addProductToCart}
            size="large"
            prefix={
              <img
                className="addcart-icon"
                src={IMG.CART_SVG}
                alt="Add to cart"
              />
            }
          >
            buy now
          </Button>
        </div>
      </div>
    </>
  );
};

ProductDetail.propTypes = {
  productInfo: PropTypes.object,
  onBack: PropTypes.func,
};

export default ProductDetail;
