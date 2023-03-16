import React from 'react';
import PropTypes from 'prop-types';
import IMG from 'app/utils/images';
import Button from '../../../../../components/Common/Button';
import { NextButton } from '../../../../../components/Common/Button/Button';
import ProductOverview from '../../../../../composed-components/ProductOverview/ProductOverview';

function ProductOverviewPerformanceCreation(props) {
  const productId = props.productOverview.id;

  return (
    <ProductOverview {...props}>
      <NextButton
        onClick={() => {
          props.onClose();
          props.onProductClick(productId);
        }}
      >
        {props.isSelected ? 'Remove From Performance' : 'Add to performance'}
      </NextButton>

      <Button
        type="secondary"
        background="transparent"
        textColor="blue"
        onClick={() => props.onEditProduct(productId)}
        prefix={
          <img src={IMG.EDIT_GREEN} className="edit-icon" alt="edit icon" />
        }
      >
        Edit product
      </Button>
    </ProductOverview>
  );
}

ProductOverviewPerformanceCreation.propTypes = {};

export default ProductOverviewPerformanceCreation;
