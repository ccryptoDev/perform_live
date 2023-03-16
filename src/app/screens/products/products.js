import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import injectSaga from 'app/utils/injectSaga';
import injectReducer from 'app/utils/injectReducer';
import { useQuery, useQueryClient } from 'react-query';
import { useApi } from '../../hooks/api';

import Button from '../../components/Common/Button/Button';
import Tabs from '../../components/Tabs';
import './products.scss';
import ProductsProducts from './components/ProductsProducts';
import ProductsDraft from './components/ProductsDraft';
import ConfirmModal from '../../components/ConfirmModal';
import ProductCreate from '../productManagement/screens/productCreate';
import PlusIcon from '../../components/EmptyState/plus.svg';
import { createProductOverviewProductsFlow } from './components/ProductOverviewProductsFlow';

export const Products = props => {
  const [tab, settab] = useState(0);
  const [createProduct, setCreateProduct] = useState(0);
  const [editProduct, setEditProduct] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    show: false,
  });
  const { getPerformerProduct, deletePerformerProductIdId } = useApi(
    'performer',
  );
  const { data } = useQuery('products', () =>
    getPerformerProduct({ gallery: true }),
  );
  const queryClient = useQueryClient();

  const inDraft = useMemo(
    () => (data ? data.filter(el => el.state === 0) : []),
    [data],
  );
  const published = useMemo(
    () => (data ? data.filter(el => el.state === 1) : []),
    [data],
  );
  const tabsData = useMemo(
    () => [
      { number: published && published.length, name: 'Products' },
      { number: published && inDraft.length, name: 'Drafts' },
    ],
    [inDraft, published],
  );
  const handleAddProduct = () => setCreateProduct(true);
  const handleDeleteProduct = async productId => {
    await deletePerformerProductIdId(productId);
    setEditProduct(null);
    setShowDeleteConfirmation({ show: false });
    queryClient.invalidateQueries('products');
  };
  const showDeleteModal = productId => {
    setShowDeleteConfirmation({ show: true, id: productId });
  };

  const tabsComponents = useMemo(
    () => [
      <ProductsProducts
        products={published}
        handleAddProduct={handleAddProduct}
        handleEditProduct={setEditProduct}
        handleDeleteProduct={showDeleteModal}
      />,
      <ProductsDraft
        products={inDraft}
        handleAddProduct={handleAddProduct}
        handleEditProduct={setEditProduct}
        handleDeleteProduct={showDeleteModal}
      />,
    ],
    [published, inDraft],
  );

  const handleClose = () => {
    queryClient.invalidateQueries('products');
    setCreateProduct(false);
  };

  const showTopBarButton =
    (tab === 0 && published.length !== 0) ||
    (tab === 1 && inDraft.length !== 0);

  return (
    <div className="products-container">
      <div className="products__topbar">
        <h1>Products</h1>
        {showTopBarButton && (
          <Button
            type="secondary"
            size="medium-large"
            className="products__add-product"
            onClick={handleAddProduct}
          >
            <img className="products__add-product-image" src={PlusIcon} />
            Add product
          </Button>
        )}
      </div>
      <Tabs tabs={tabsData} onTabClick={settab} activeTab={tab} />
      {tabsComponents[tab]}
      {createProduct && (
        <ProductCreate
          onClose={handleClose}
          overviewComponent={createProductOverviewProductsFlow({
            handleDelete: showDeleteModal,
          })}
        />
      )}
      {editProduct && (
        <ProductCreate
          onClose={() => setEditProduct(null)}
          defaultProductData={editProduct}
          overviewComponent={createProductOverviewProductsFlow({
            handleDelete: showDeleteModal,
          })}
          step={tab === 0 ? 3 : 0}
        />
      )}
      {showDeleteConfirmation.show && (
        <ConfirmModal
          title="Delete product?"
          subtitle="This product will be deleted with no possibility to restore it."
          leftButtonProps={{
            background: 'transparent',
            border: 'gradient',
            label: 'DELETE',
            onClick: () => handleDeleteProduct(showDeleteConfirmation.id),
          }}
          rightButtonProps={{
            label: 'KEEP',
            onClick: () => setShowDeleteConfirmation({ show: false }),
          }}
        />
      )}
    </div>
  );
};

Products.propTypes = {};

export default Products;
