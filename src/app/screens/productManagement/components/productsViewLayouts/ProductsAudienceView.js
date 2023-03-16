import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import ProductDetail from './ProductDetail';
import ProductItem from './ProductItem';

const ProductsAudienceView = ({
  productList = [],
  focusedProducts,
  handleShowMore,
  addProductToCart,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [productToView, setProductToView] = useState(null);

  return (
    <>
      {(productList.length && (
        <div className={showMore ? 'top-sidebar active' : 'top-sidebar'}>
          {!detailView && (
            <div className="product-audience-view">
              <div className={showMore ? 'products active' : 'products'}>
                {productList &&
                  productList.map(product => (
                    <ProductItem
                      openDetail={() => {
                        setDetailView(true);
                        setProductToView(product);
                      }}
                      productInfo={product}
                      key={product.id}
                      isFocused={focusedProducts.indexOf(product.id)}
                      addProductToCart={addProductToCart}
                    />
                  ))}
              </div>
              {/* {productList.length > 2 && (
                <div className={showMore ? 'show-more active' : 'show-more'}>
                  <button
                    className="show-btn"
                    type="button"
                  >
                    Total
                    <span className="count">
                      {productList && productList.length}
                    </span>
                    <span className="red-text">.</span>
                    <span className="text">products</span>
                  </button>
                </div>
              )} */}
            </div>
          )}

          {detailView && (
            <ProductDetail
              addProductToCart={addProductToCart}
              productInfo={productToView}
              onBack={() => setDetailView(false)}
            />
          )}
        </div>
      )) || (
        <div className={showMore ? 'top-sidebar active' : 'top-sidebar'}>
          {!detailView && (
            <div className="product-audience-view">
              <div className="no-product">No products</div>
              <div className="show-more">
                <button className="show-btn" type="button">
                  <span className="count">
                    {productList && productList.length}
                  </span>
                  <span className="red-text">.</span>
                  <span className="text">products</span>
                </button>
              </div>
            </div>
          )}

          {detailView && (
            <ProductDetail
              addProductToCart={addProductToCart}
              productInfo={productToView}
              onBack={() => setDetailView(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

ProductsAudienceView.propTypes = {
  productList: PropTypes.array,
};

export default memo(ProductsAudienceView);
