import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormikProvider, useFormik } from 'formik';
import './AddProductQuantity.scss';

import ProductModal from '../../../../components/Common/ProductModal/ProductModal';
import ToggleButton from '../../../../components/ToggleButton';
import {
  NextButton,
  PrevButton,
} from '../../../../components/Common/Button/Button';
import { schema } from './AddProductQuantity.validations';
import { ControlledCountSelector } from '../../../../components/CountSelector/CountSelector';
import { ControlledDropdown } from '../../../../components/Dropdown/Dropdown';
import { useProductPackages } from '../../../../hooks/useProductPackages.query';

const AddProductQuantity = props => {
  const formik = useFormik({
    initialValues: {
      ...props.data,
    },
    validationSchema: schema,
  });

  const { values, setFieldValue } = formik;
  const { dropdownOptions } = useProductPackages();

  useEffect(
    () => {
      if (formik.values.stock < formik.values.shipmentLimit) {
        formik.setFieldValue('shipmentLimit', formik.values.stock);
      }
    },
    [formik.values.stock],
  );

  return (
    <ProductModal
      title={props.productId ? 'Edit Product' : 'New Product'}
      onClose={props.onClose}
      currentStep={3}
      subtitle="Shipment option"
    >
      <FormikProvider value={formik}>
        <div className="quantity-details">
          <div className="input-name toggle-group">
            <ToggleButton
              onChange={value => setFieldValue('shippable', value)}
              checked={values.shippable}
            />
            <div className="toggle-label">Shippable product</div>
          </div>
          <p className="toggle-description">
            Physical item that should be shipped
          </p>
          {values.shippable && (
            <>
              <ControlledCountSelector
                name="stock"
                label="Available in Stock"
                min={1}
              />

              <ControlledCountSelector
                name="shipmentLimit"
                label="Limit Per Shipment"
                max={formik.values.stock}
                min={1}
              />

              <ControlledDropdown
                label="Box size"
                options={dropdownOptions}
                placeholder="Choose the size"
                name="packageId"
              />
            </>
          )}
        </div>

        <div className="quantity-details__action-btns">
          <NextButton
            disabled={!formik.isValid}
            onClick={() => props.onNext(values)}
          >
            Save
          </NextButton>

          <PrevButton
            onClick={() => props.onBack(values)}
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

AddProductQuantity.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
  productId: PropTypes.number,
};

export default AddProductQuantity;
