import React from 'react';
import propTypes from 'prop-types';

const Products = ({ productsData }) => {
  return (
    <div className="products">
      .<div className="products__header">Header</div>
      {productsData.map(productData => productData)}
    </div>
  );
};

Products.propTypes = {
  productsData: propTypes.array,
};

export default Products;
