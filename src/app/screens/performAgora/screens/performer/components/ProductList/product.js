import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="product-item">
      <div className="focus-button flex-center">Focus</div>
      <div className="product-thumbnail flex-center">
        <img src={product.src} alt={product.title} />
      </div>
      <p className="product-title">{product.title}</p>
      <div className="product-price flex-center">
        <span className="currency-signal">$</span>
        <span className="price-value">
          9.
          <small>49</small>
        </span>
      </div>
    </div>
  );
}
