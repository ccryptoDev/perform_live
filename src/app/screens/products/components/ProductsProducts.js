import React from 'react';
import PropTypes from 'prop-types';
import ProductSmallCard from '../../../components/ProductSmallCard';
import EmptyState from '../../../components/EmptyState/EmptyState';

function ProductsProducts({
  products,
  handleAddProduct,
  handleDeleteProduct,
  handleEditProduct,
}) {
  return (
    <div className="products-products">
      {products.map(product => (
        <ProductSmallCard
          key={product.id}
          product={product}
          onDelete={handleDeleteProduct}
          onClick={handleEditProduct}
        />
      ))}
      {!!products.length || (
        <EmptyState
          title="No products listed yet"
          subtitle="Start adding products that you want to sell during future performances!"
          buttonText="ADD PRODUCT"
          onClick={handleAddProduct}
        />
      )}
    </div>
  );
}

ProductsProducts.propTypes = {
  products: PropTypes.array,
};

export default ProductsProducts;
