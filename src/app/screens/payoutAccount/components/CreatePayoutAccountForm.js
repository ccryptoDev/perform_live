import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { FormikProvider, useFormik } from 'formik';
import { mixed, object, string } from 'yup';
import { ControledLabeledInput } from '../../../components/LabeledInput/LabeledInput';
import { ControlledDropdown } from '../../../components/Dropdown/Dropdown';
import Button from '../../../components/Common/Button';
import CircularSpinner from '../../../components/CircularSpinner';

const schema = object().shape({
  accHolderName: string().required('Enter account holder name'),
  accNumber: string().required('Enter account number'),
  routingNumber: string().required('Enter routing number'),
  accHolderType: mixed().required('Enter account holder type'),
  currency: mixed().required('Enter currency'),
  country: mixed().required('Enter country'),
});

function CreatePayoutAccountForm({ onClose, onSubmit, spinner }) {
  const formik = useFormik({
    initialValues: {
      accHolderName: '',
      accNumber: '',
      routingNumber: '',
      accHolderType: '',
      currency: '',
      country: '',
    },
    validationSchema: schema,
  });

  const accHolderTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
  ];
  const currency = [{ value: 'usd', label: 'USD' }];
  const countries = [{ value: 'us', label: 'US' }];

  return (
    <div className="create-payout-acc-flow">
      <FormikProvider value={formik}>
        <ControledLabeledInput
          name="accHolderName"
          label="Account holder name"
        />
        <div className="input-row">
          <ControledLabeledInput
            name="accNumber"
            label="Account number"
            className="left-input"
          />
          <ControledLabeledInput name="routingNumber" label="Routing number" />
        </div>
        <div className="input-row">
          <ControlledDropdown
            options={accHolderTypes}
            name="accHolderType"
            label="Account holder type"
            className="left-input"
          />
          <ControlledDropdown
            options={currency}
            name="currency"
            label="Currency"
          />
        </div>
        <ControlledDropdown
          options={countries}
          name="country"
          label="Country"
        />
        <div className="create-payout-acc-flow__action-btns">
          <Button background="transparent" border="gradient" onClick={onClose}>
            CANCEL
          </Button>
          <Button onClick={() => onSubmit(formik)}>SAVE</Button>
        </div>
      </FormikProvider>

      {spinner && (
        <div className="create-payout-acc-flow__spinner-container">
          <CircularSpinner message="Creating payout account" />
        </div>
      )}
    </div>
  );
}

CreatePayoutAccountForm.propTypes = {
  onClose: propTypes.func,
  onSubmit: propTypes.func,
};

export default CreatePayoutAccountForm;
