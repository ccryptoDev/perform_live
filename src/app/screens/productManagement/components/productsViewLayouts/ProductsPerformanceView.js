import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './performer-products.scss';
import { firebaseClient } from '../../../../utils/firebase';
import { PerformAgoraConstants } from '../../../performAgora/performAgora.constants';
import Button from '../../../../components/Common/Button';
import { beautifyPrice } from '../../../../utils/numbers';

const ProductItem = ({ productInfo, isFocused }) => {
  const [focusedProduct, setFocusProduct] = useState(isFocused);
  const splitPrice = beautifyPrice(productInfo.price).split('.');

  const channelMessageRef = `channel_events/${
    firebaseClient._channel
  }/channelMessage`;
  const toggleProductFocus = () => {
    setFocusProduct(!focusedProduct);
    // send channel Message for product focus/unfocus
    const data = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.FOCUS_UNFOCUS_PRODUCT,

      messageData: {
        isFocused: !focusedProduct,
        productId: productInfo.id,
      },
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.pushData(channelMessageRef, data);

    const channelStateRef = `channel_state/${
      firebaseClient._channel
    }/focused_products`;
    firebaseClient.getDataOnce(channelStateRef, data => {
      //  if (data.value) {
      const focusedProducts = (data.value && [...data.value]) || [];
      if (!focusedProduct) {
        // save this info in channel_state table as well
        focusedProducts.push(productInfo.id);
      } else {
        const indexToRemove = focusedProducts.indexOf(productInfo.id);
        focusedProducts.splice(indexToRemove, 1);
      }
      firebaseClient.setData(channelStateRef, focusedProducts);
      // }
    });
  };

  useEffect(
    () => {
      setFocusProduct(isFocused);
    },
    [isFocused],
  );

  return (
    <div className="product-item">
      <Button
        size="large"
        onClick={toggleProductFocus}
        onKeyPress={toggleProductFocus}
        tabIndex="0"
        className="focus-button"
        fontSize="10px"
        background={focusedProduct ? 'transparent' : 'gradient'}
        border={focusedProduct && 'gradient'}
      >
        <span>{focusedProduct ? 'UnFocus' : 'Focus'}</span>
      </Button>
      <div className="product-thumbnail flex-center">
        <img
          src={productInfo.gallery && productInfo.gallery[0].url}
          alt={productInfo.name}
        />
      </div>
      <div className="product-title">{productInfo.name}</div>
      <div className="product-price flex-center">
        <span className="currency-signal">$</span>
        <span className="price-value">
          {splitPrice[0]}.<small>{splitPrice[1] || '00'}</small>
        </span>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  productInfo: PropTypes.object,
};

const ProductPerformanceView = ({ productList = [] }) => {
  const [activeFocusedProducts, setFocusedProducts] = useState([]);
  useEffect(() => {
    const channelStateRef = `channel_state/${
      firebaseClient._channel
    }/focused_products`;
    firebaseClient.getDataOnce(channelStateRef, data => {
      //  if (data.value) {
      const focusedProducts = (data.value && [...data.value]) || [];
      setFocusedProducts([...focusedProducts]);
    });
  }, []);
  return (
    <div className="performer-product-list">
      {productList.map(product => (
        <ProductItem
          productInfo={product}
          key={product.id}
          isFocused={activeFocusedProducts.indexOf(product.id) !== -1}
        />
      ))}
    </div>
  );
};

ProductPerformanceView.propTypes = {
  productList: PropTypes.array,
};

export default memo(ProductPerformanceView);
