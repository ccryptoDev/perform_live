import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';

import reducer from './state/productCreate.reducer';
import saga from './state/productCreate.saga';
import { injectReducer, injectSaga } from './productCreate.dependencies';

import AddProductGallery from '../../components/AddProductGallery/AddProductGallery';
import AddProductDetails from '../../components/AddProductDetails/AddProductDetails';
import AddProductQuantity from '../../components/AddProductQuantity/AddProductQuantity';
import { useApi } from '../../../../hooks/api';
import Loader from '../../../../components/Loader';
import plToast from '../../../../utils/toast';

export const ProductCreate = props => {
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(props.step || 0);
  const [spinner, setSpinner] = useState(false);
  const { postFileUpload } = useApi('file');
  const {
    postPerformerProductIdIdGallery,
    postPerformerProduct,
    putPerformerProductIdId,
    putPerformerProductIdIdGallery,
    getPerformerProductIdIdCategories,
  } = useApi('performer');

  const [productData, setProductData] = useState({
    // step 1
    gallery: [],

    // step 2
    details: '',
    name: '',
    price: '',
    sellerPrice: '',

    // step 3
    shippable: false,
    stock: 5,
    shipmentLimit: 1,
    size: null,

    ...props.defaultProductData,
  });

  useQuery(
    ['productCategories', productData.id],
    () => getPerformerProductIdIdCategories(productData.id),
    {
      enabled: !!productData.id,
      onSuccess: res => setProductData(data => ({ ...data, category: res[0] })),
    },
  );

  const uploadGallery = async (productId, gallery) => {
    if (!gallery.length) {
      return;
    }

    const galleryUpdates = gallery.filter(e => e).map(async file => {
      if (!file.url) {
        const fileFormData = new FormData();
        fileFormData.append('file', file);
        const fileUploadRes = await postFileUpload(fileFormData);
        const galleryRes = await postPerformerProductIdIdGallery(productId, {
          imageUrl: fileUploadRes.url,
        });
        return galleryRes;
      }

      return file;
    });
    const filesRes = await Promise.all(galleryUpdates);
    setProductData(data => ({ ...data, gallery: filesRes }));
    await putPerformerProductIdIdGallery(productId, {
      swaps: filesRes.map((file, index) => ({ id: file.id, index })),
    });
  };

  const saveProductDetails = async newData => {
    setSpinner(true);
    newData.price = +newData.price;
    newData.stock = +newData.stock;

    const payload = {
      name: newData.name,
      details: newData.details,
      price: newData.price,
      stock: newData.stock,
      shipmentLimit: newData.shipmentLimit,
      shippable: newData.shippable,
      packageId: newData.packageId,
      state: 1,
      categories: [newData.category],
    };

    try {
      if (productData.id) {
        await putPerformerProductIdId(productData.id, payload);
        await uploadGallery(productData.id, newData.gallery);
      } else {
        const productRes = await postPerformerProduct(payload);
        await uploadGallery(productRes.id, newData.gallery);
        setProductData(state => ({ ...state, ...productRes }));
      }
    } catch (e) {
      plToast.error(`Can't save product`);
    } finally {
      queryClient.invalidateQueries('products');
      setSpinner(false);
    }
  };

  const handleNext = useCallback(async data => {
    const newData = { ...productData, ...data };
    setProductData(newData);

    // final step
    if (currentStep === 2) {
      await saveProductDetails(newData);
      setCurrentStep(state => state + 1);
      return;
    }

    setCurrentStep(state => state + 1);
  });

  const handleBack = useCallback(data => {
    setProductData({ ...productData, ...data });
    setCurrentStep(state => state - 1);
  });

  const steps = useMemo(() => [
    <AddProductGallery
      onNext={handleNext}
      data={productData}
      onClose={props.onClose}
      productId={productData.id}
    />,
    <AddProductDetails
      onNext={handleNext}
      onBack={handleBack}
      data={productData}
      onClose={props.onClose}
      productId={productData.id}
    />,
    <AddProductQuantity
      onNext={handleNext}
      onBack={handleBack}
      data={productData}
      onClose={props.onClose}
      productId={productData.id}
    />,
    props.overviewComponent({
      productOverview: productData,
      onClose: props.onClose,
      onEditProduct: () => setCurrentStep(0),
      isSelected: props.isSelected,
      onProductClick: props.onProductClick,
    }),
  ]);

  return (
    <>
      {steps[currentStep]}
      {spinner && <Loader />}
    </>
  );
};

ProductCreate.propTypes = {
  defaultProductData: PropTypes.object,
  onClose: PropTypes.func,
  onProductClick: PropTypes.func,
  overviewComponent: PropTypes.any,
  step: PropTypes.number,
};

const withReducer = injectReducer({
  key: 'productcreate',
  reducer,
  blacklist: [
    'galleryImages',
    'productInfo',
    'isProductCreated',
    'galleryCounts',
    'swapImagesOrder',
    'productGallery',
  ],
});
const withSaga = injectSaga({ key: 'productcreate', saga });

const withConnect = connect(
  null,
  null,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductCreate);
