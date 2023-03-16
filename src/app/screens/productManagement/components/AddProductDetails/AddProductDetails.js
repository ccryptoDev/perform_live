import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import { FormikProvider, useFormik } from 'formik';
import './AddProductDetails.scss';

import { IMG } from '../../productManagement.dependencies';
import { dropDownItems } from './mocks';
import ProductModal from '../../../../components/Common/ProductModal/ProductModal';
import Checkbox from '../../../../components/Inputs/Checkbox';
import { useApi } from '../../../../hooks/api';
import { schema } from './AddProductDetails.validations';
import {
  NextButton,
  PrevButton,
} from '../../../../components/Common/Button/Button';
import { ControledLabeledInput } from '../../../../components/LabeledInput/LabeledInput';
import { ControledLabeledTextArea } from '../../../../components/LabeledTextArea/LabeledTextArea';
import { ControlledDropdown } from '../../../../components/Dropdown/Dropdown';
import RedArrowIcon from './red-arrow.svg';

const AddProductDetails = props => {
  const { getPaymentPriceEarn, getPaymentPriceProduct } = useApi('payment');
  const formik = useFormik({
    initialValues: {
      ...props.data,
      agree: false,
    },
    validationSchema: schema,
  });

  useEffect(() => {
    if (formik.values.price && !formik.values.sellerPrice) {
      getProductPriceDelayed(formik.values.price);
    }
  }, []);

  const getProductPriceDelayed = useCallback(
    _debounce(async price => {
      if (price) {
        const data = await getPaymentPriceEarn(price);
        formik.setFieldValue('sellerPrice', data.price);
      } else {
        formik.setFieldValue('sellerPrice', 0);
      }
    }, 1000),
    [formik.handleChange],
  );
  const getPerformerEarnPriceDelayed = useCallback(
    _debounce(async price => {
      if (price) {
        const data = await getPaymentPriceProduct(price);
        formik.setFieldValue('price', data.price);
      } else {
        formik.setFieldValue('price', 0);
      }
    }, 1000),
    [],
  );

  const handlePriceChange = e => {
    getProductPriceDelayed(e.target.value);
    // formik.setFieldValue('price', e.target.value);
  };

  const handleSellerPriceChange = e => {
    getPerformerEarnPriceDelayed(e.target.value);
    // formik.setFieldValue('sellerPrice', e.target.value);
  };

  return (
    <ProductModal
      title={formik.values.name || 'Product'}
      onClose={props.onClose}
      currentStep={2}
      subtitle="Details"
    >
      <FormikProvider value={formik}>
        <div className="gallery-details">
          <ControledLabeledInput
            name="name"
            label="Product name"
            placeholder="Product name"
            maxLength={35}
          />

          <ControlledDropdown
            label="Product category"
            placeholder="Choose category"
            options={dropDownItems.map(e => ({
              label: e,
              value: e,
            }))}
            name="category"
          />

          <ControledLabeledTextArea
            name="details"
            label="Description"
            placeholder="Provide a summary of your performance"
            maxLength="400"
            rows="3"
          />

          <div className="price-detail">
            <ControledLabeledInput
              name="price"
              label="Price visible for customers"
              onChange={handlePriceChange}
              suffix={<span className="text">USD</span>}
            />

            <img src={IMG.VECTOR} className="vector" alt="vector" />

            <ControledLabeledInput
              name="sellerPrice"
              label="The profit you will get"
              onChange={handleSellerPriceChange}
              suffix={<span className="text">USD</span>}
            />
          </div>

          <div className="platform">
            <span className="text">
              PerformLive Platform Fee: 7.5% + $0.99 per item sold.
              <Link to="/userAgreement" className="learn">
                Learn more
              </Link>
            </span>
          </div>

          <div className="product-agreement-wrapper">
            <div className="product-agreement">
              <Checkbox
                name="agree"
                onChange={formik.handleChange}
                value={formik.values.agree}
              />
              <p>
                I acknowledge that as a Seller, I am responsible, for sales tax
                collection and remission on all product sales. I confirm that
                sales tax is included in my Customer Price listing in compliance
                with Sales Tax Laws.
                <Link to="/userAgreement" className="learn">
                  Learn more
                </Link>
              </p>
            </div>
            {formik.errors.agree && (
              <div className="product-agreement__error">
                <img src={RedArrowIcon} alt="red arrow" />
                This checkbox is required
              </div>
            )}
          </div>
        </div>

        <div className="product-details__action-btns">
          <NextButton
            onClick={() => props.onNext(formik.values)}
            disabled={!formik.isValid}
          >
            Save and continue
          </NextButton>

          <PrevButton
            onClick={() => props.onBack(formik.values)}
            type="secondary"
            size="medium-large"
            background="transparent"
            textColor="blue"
          >
            Back
          </PrevButton>
        </div>
      </FormikProvider>
    </ProductModal>
  );
};

AddProductDetails.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
};

export default AddProductDetails;
