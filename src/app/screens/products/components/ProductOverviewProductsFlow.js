import React from 'react';
import PropTypes from 'prop-types';
import ProductOverview from '../../../composed-components/ProductOverview/ProductOverview';
import Button from '../../../components/Common/Button';
import BasketIcon from '../../../../assets/svg/btns/basket.svg';

export const createProductOverviewProductsFlow = closureProps => {
  return function ProductOverviewProductsFlow(props) {
    return (
      <ProductOverview {...props}>
        <Button onClick={() => props.onEditProduct(props.productOverview.id)}>
          EDIT PRODUCT
        </Button>
        <Button
          type="secondary"
          background="transparent"
          textColor="pink"
          onClick={() => closureProps.handleDelete(props.productOverview.id)}
          prefix={<img src={BasketIcon} alt="basket icon" />}
        >
          Delete product
        </Button>
      </ProductOverview>
    );
  };
};

// ProductOverviewProductsFlow.propTypes = {};

// export default ProductOverviewProductsFlow;
