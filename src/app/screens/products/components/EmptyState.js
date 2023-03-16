import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/Common/Button/Button';
import PlusIcon from './plus.svg';

function EmptyState({ handleAddProduct }) {
  return (
    <div className="empty-state">
      <div className="empty-state__title">No products listed yet</div>
      <div className="empty-state__sub">
        Start adding products that you want to sell during future performances!
      </div>
      <Button
        type="secondary"
        size="medium-large"
        className="empty-state__add-product"
        onClick={handleAddProduct}
      >
        <img
          className="products__add-product-image"
          src={PlusIcon}
          alt="plus icon"
        />
        Add product
      </Button>
    </div>
  );
}

EmptyState.propTypes = {
  handleAddProduct: PropTypes.func,
};

export default EmptyState;
