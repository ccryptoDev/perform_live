/**
 *
 * ProductManagement container
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import _get from 'lodash/get';

import { defaultAction } from './state/productManagement.actions';
import reducer from './state/productManagement.reducer';
import saga from './state/productManagement.saga';
import { injectReducer, injectSaga } from './productManagement.dependencies';
import ProductCreate from './screens/productCreate/productCreate';
import ProductOverviewPerformanceCreation from './screens/productCreate/components/ProductOverviewPerformanceCreation';

export const ProductManagement = props => {
  const { id } = useParams();
  const [createProduct, setProductCreate] = useState(
    props.enableCreateProduct || false,
  );

  const toggleProuductCreate = () => {
    setProductCreate(prevState => !prevState);
  };

  useEffect(
    () => {
      setProductCreate(!!props.enableCreateProduct);
    },
    [props.enableCreateProduct],
  );

  return (
    <>
      {createProduct && (
        <ProductCreate
          // onProductCreate={props.onProductCreate || toggleProuductCreate}
          onProductClick={props.onProductClick}
          onClose={props.onClose}
          defaultProductData={props.defaultProductData}
          isEdit={props.isEdit}
          overviewComponent={ProductOverviewPerformanceCreation}
        />
      )}
    </>
  );
};

ProductManagement.propTypes = {
  productView: PropTypes.string,
  enableCreateProduct: PropTypes.bool,
  onProductCreate: PropTypes.func,
  onClose: PropTypes.func,
  defaultProductData: PropTypes.object,
  isEdit: PropTypes.bool,
  handleShowMore: PropTypes.func,
  focusedProducts: PropTypes.any,
};

const mapStateToProps = state => ({
  defaultState: _get(state.productmanagement, 'defaultState', null),
});

const mapDispatchToProps = dispatch => ({
  defaultAction: payload => dispatch(defaultAction(payload)),
});

const withReducer = injectReducer({
  key: 'productmanagement',
  reducer,
  blacklist: [
    'performanceProducts',
    'productEarnPrice',
    'productPriceFromEarn',
  ],
});
const withSaga = injectSaga({ key: 'productmanagement', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default memo(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(ProductManagement),
);
