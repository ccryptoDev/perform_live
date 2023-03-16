import React from 'react';
import PropTypes from 'prop-types';
import ProductSmallCard from '../../../components/ProductSmallCard';
import EmptyState from '../../../components/EmptyState/EmptyState';

function ProductsDraft({
  products,
  handleAddProduct,
  handleDeleteProduct,
  handleEditProduct,
}) {
  return (
    <div className="products-draft">
      {products.map(product => (
        <ProductSmallCard
          key={product.id}
          product={product}
          draft
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
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

ProductsDraft.propTypes = {
  products: PropTypes.array,
};

export default ProductsDraft;
