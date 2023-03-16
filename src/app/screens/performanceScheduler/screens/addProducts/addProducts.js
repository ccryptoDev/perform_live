import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { IMG } from '../../performanceScheduler.dependencies';
import { PerformanceFooter } from '../../components/PerformanceFooter/PerformanceFooter';
import ProductOverview from '../../../../composed-components/ProductOverview/ProductOverview';
import { getPerformerProducts } from '../../../../state/app.actions';
import { resetState } from '../../../productManagement/state/productManagement.actions';
// import { firebaseClient } from '../../../../utils/firebase';
import ProductCard from '../../../../components/ProductCard';
import useApi from '../../../../hooks/api';
import ProductItemPreview from '../../../../components/ProductItemPreview/ProductItemPreview';
import Button from '../../../../components/Common/Button';
import Pencil from '../../../../../assets/svg/pencil-blue.svg';
import WarningIcon from '../../../../../assets/svg/audience/warning-light-pink.svg';
import TrueIcon from '../../../../../assets/svg/audience/true.svg';
import { ProductCreate } from '../../../productManagement/screens/productCreate/productCreate';
import ProductOverviewPerformanceCreation from '../../../productManagement/screens/productCreate/components/ProductOverviewPerformanceCreation';

const AddProducts = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { id: paramsPerformanceId } = useParams();

  const performanceId = paramsPerformanceId || props.performanceData.id;
  const performerProducts = useSelector(state => state.global.productList);

  const [createProduct, setProductCreate] = useState(false);
  const [productOverview, setProductOverview] = useState(null);

  const {
    getPerformerPerformanceIdIdProduct,
    postPerformerPerformanceIdIdProductProductId,
    deletePerformerPerformanceIdIdProductProductId,
  } = useApi('performer');
  const query = useQuery(
    'selectedProducts',
    () =>
      getPerformerPerformanceIdIdProduct(performanceId).then(data =>
        data.map(el => el.id),
      ),
    { refetchOnWindowFocus: false },
  );
  const { data: selectedProducts, isLoading: productsLoading } = query;

  const addProductToPerformance = useMutation(
    ({ id, productId }) =>
      postPerformerPerformanceIdIdProductProductId(id, productId),
    {
      onMutate: async ({ productId }) => {
        await queryClient.cancelQueries('selectedProducts');
        const prev = queryClient.getQueryData('selectedProducts');
        queryClient.setQueryData('selectedProducts', old => [
          ...old,
          productId,
        ]);
        return { prev };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData('selectedProducts', context.prev);
      },
    },
  );

  const deleteProductFromPerformance = useMutation(
    ({ id, productId }) =>
      deletePerformerPerformanceIdIdProductProductId(id, productId),
    {
      onMutate: async ({ productId }) => {
        await queryClient.cancelQueries('selectedProducts');
        const prev = queryClient.getQueryData('selectedProducts');
        queryClient.setQueryData('selectedProducts', old =>
          old.filter(id => id !== productId),
        );
        return { prev };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData('selectedProducts', context.prev);
      },
    },
  );

  const toggleProuductCreate = () => {
    setProductCreate({});
    dispatch(resetState());
  };

  const toggleSelectedProducts = useCallback(
    productId => {
      const productIndex = selectedProducts.indexOf(productId);

      if (productIndex === -1) {
        // add product
        addProductToPerformance.mutate({
          id: performanceId,
          productId,
        });
      } else {
        // delete
        deleteProductFromPerformance.mutate({
          id: performanceId,
          productId,
        });
      }
    },
    [query],
  );

  // const updateAudienceProductList = () => {};

  // useEffect(() => {
  //   if (props.from === 'livePerformance') {
  //     firebaseClient._emitter.on(
  //       'add_update_product',
  //       updateAudienceProductList,
  //     );
  //   }
  //   return () => {
  //     firebaseClient._emitter.off(
  //       'add_update_product',
  //       updateAudienceProductList,
  //     );
  //   };
  // }, []);

  useEffect(
    () => {
      if (!createProduct) {
        dispatch(getPerformerProducts());
      }
    },
    [createProduct],
  );

  const handleStepChange = () => {
    props.onNextClick({ selectedProducts });
  };

  useImperativeHandle(ref, () => ({
    saveChild(cb) {
      cb();
    },
  }));

  const closeProductDialog = () => {
    setProductCreate(null);
  };

  const handleEditProduct = product => {
    setProductCreate(product);
    setProductOverview(null);
  };

  if (productsLoading) return 'loading';

  const Messages = () => {
    return (
      <>
        {props.from === 'livePerformance' && selectedProducts.length ? (
          <div className="products__message">
            <img src={TrueIcon} alt="true" />
            <div>
              <span>{selectedProducts.length}</span> products selected
            </div>
          </div>
        ) : (
          <div className="products__message">
            <img src={WarningIcon} alt="warning" />
            <div>You have not selected any products</div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="content">
        <div className="card">
          <div
            className={cn('card-product', {
              'content-header': props.from === 'livePerformance',
            })}
          >
            <div className="title">Products</div>
            <div className="per-name">
              <div className="name">
                {props.from !== 'livePerformance' && (
                  <div>
                    Select products you are going to sell at{' '}
                    <span className="performance-text-highlight">
                      {props.performanceData.name}
                    </span>{' '}
                    or add new products
                  </div>
                )}
                {props.from === 'livePerformance' && <Messages />}
              </div>

              <div className="product-items-preview">
                {selectedProducts
                  .map(productId =>
                    performerProducts.find(product => product.id === productId),
                  )
                  .map(productInfo => {
                    if (!productInfo) return true;
                    return (
                      <ProductItemPreview
                        productInfo={productInfo}
                        toggleSelectedProducts={toggleSelectedProducts}
                      />
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="border-line" />

          <div className="products-group">
            <div className="new-layer">
              {props.from !== 'livePerformance' && (
                <div
                  className="new-product"
                  onClick={toggleProuductCreate}
                  onKeyPress={toggleProuductCreate}
                  role="button"
                  tabIndex="0"
                >
                  <img
                    src={IMG.PRODUCT_ADD}
                    className="add-btn"
                    alt="add product"
                  />
                  <span className="text">New product</span>
                </div>
              )}
              {createProduct && (
                <ProductCreate
                  onProductClick={toggleSelectedProducts}
                  onClose={closeProductDialog}
                  defaultProductData={createProduct}
                  isSelected={selectedProducts.indexOf(createProduct.id) !== -1}
                  overviewComponent={ProductOverviewPerformanceCreation}
                />
              )}
            </div>
            {props.from !== 'livePerformance' && (
              <Button
                type="secondary"
                textColor="pink"
                size="large"
                className="skip-btn"
                background="transparent"
                onClick={handleStepChange}
              >
                Skip For Now
              </Button>
            )}
            <div className="products">
              {performerProducts.map(product => (
                <ProductCard
                  product={product}
                  key={product.id}
                  checked={selectedProducts.indexOf(product.id) !== -1}
                  onCheck={toggleSelectedProducts}
                  onViewProductClick={() => setProductOverview(product)}
                />
              ))}
            </div>

            <div className="product-create">
              {productOverview && (
                <ProductOverview
                  productOverview={productOverview}
                  onClose={() => setProductOverview(null)}
                >
                  <Button
                    size="large"
                    onClick={() => {
                      toggleSelectedProducts(productOverview.id);
                    }}
                  >
                    {selectedProducts.indexOf(productOverview.id) !== -1
                      ? 'Remove from performance'
                      : 'Add to performance'}
                  </Button>
                  <Button
                    type="secondary"
                    size="medium-large"
                    background="transparent"
                    textColor="blue"
                    onClick={() => handleEditProduct(productOverview)}
                  >
                    <img src={Pencil} alt="pencil" />
                    Edit product
                  </Button>
                </ProductOverview>
              )}
            </div>
          </div>
        </div>
      </div>
      {props.from === 'createPerformance' && (
        <PerformanceFooter
          onNext={handleStepChange}
          onBack={props.onBack}
          nextButtonText="Next: Promo Video"
        />
      )}
    </>
  );
});

AddProducts.propTypes = {
  selectedProducts: PropTypes.array,
  onNextClick: PropTypes.func,
  from: PropTypes.string,
  saveAsDraft: PropTypes.bool,
  activePerformance: PropTypes.object,
};

export default AddProducts;
