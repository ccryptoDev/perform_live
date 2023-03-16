import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { object, func } from 'prop-types';

import config from 'app/config/index.config';
import Button from 'app/components/Common/Button/Button';
import { useScript } from 'app/hooks';
import { ControledPhoneNumberInput } from 'app/components/PhoneNumberInput/PhoneNumberInput';
import { ControledAddressAutofillInput } from 'app/components/AddressAutofillInput/AddressAutofillInput';
import { ControledLabeledInput } from '../LabeledInput/LabeledInput';
// import { ControlledDropdown } from '../Dropdown/Dropdown';

import validationSchema from './validationSchema';
import './styles.scss';

const { GOOGLE_PLACE_KEY } = config;

const {
  REACT_APP_FIRSTNAME,
  REACT_APP_LASTNAME,
  REACT_APP_EMAIL,
  REACT_APP_PHONE,
  REACT_APP_CITY,
  REACT_APP_STREET,
  REACT_APP_ZIP,
  REACT_APP_COUNTRY,
  REACT_APP_STATE,
} = process.env;

const ShippingInfoForm = ({
  data = {},
  onSubmit = () => null,
  onCancel = () => null,
}) => {
  const scriptGoogleStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACE_KEY}&libraries=places&language=en`,
  );

  const {
    fullname = '',
    phone = REACT_APP_PHONE || '',
    street = REACT_APP_STREET || '',
    city = REACT_APP_CITY || '',
    state = REACT_APP_STATE || '',
    country = REACT_APP_COUNTRY || 'US',
    zip = REACT_APP_ZIP || '',
    email = REACT_APP_EMAIL || '',
  } = data;

  const [
    firstName = REACT_APP_FIRSTNAME || data.firstName || '',
    lastName = REACT_APP_LASTNAME || data.lastName || '',
  ] = fullname.split(' ').map(el => el.trim());

  const countries = [{ value: 'us', label: 'US' }];

  const onSelectAddressFromDropDown = addressStr => {
    const adressArray = addressStr.split(',').map(el => el.trim());
    formik.setFieldValue('street', adressArray[0]);
    formik.setFieldValue('city', adressArray[1]);
    formik.setFieldValue('state', adressArray[2].split(' ')[0]);
    formik.setFieldValue('zip', adressArray[2].split(' ')[1]);
  };

  const formik = useFormik({
    validationSchema,
    onSubmit,
    initialValues: {
      firstName,
      lastName,
      email,
      phone,
      city,
      street,
      zip,
      country,
      state,
      aged: false,
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="shippinginfo-form-container">
        <div className="name-container">
          <ControledLabeledInput
            name="firstName"
            placeholder="Enter your fist name"
            label="First Name"
            className="left"
          />
          <ControledLabeledInput
            name="lastName"
            placeholder="Enter your last name"
            label="Last Name"
          />
        </div>
        <div className="address-container">
          {scriptGoogleStatus !== 'ready' ? (
            <ControledLabeledInput
              name="street"
              placeholder="Enter your address"
              label="Address"
            />
          ) : (
            <ControledAddressAutofillInput
              name="street"
              placeholder="Enter your address"
              label="Address"
              onSelect={onSelectAddressFromDropDown}
            />
          )}
          <ControledLabeledInput
            name="city"
            placeholder="Enter your city"
            label="City"
          />
          <div className="statezip-container">
            <ControledLabeledInput
              name="state"
              placeholder="Enter your state/province/region"
              label="State / Province / Region"
              className="left"
            />
            <ControledLabeledInput
              name="zip"
              placeholder="Enter your zip/postal code"
              label="Zip / Postal Code"
            />
          </div>
          {/* <ControlledDropdown // TODO improve style and added it
            options={countries}
            name="country"
            label="Country"
          /> */}
          <ControledLabeledInput
            name="country"
            placeholder="Enter your country"
            label="Country"
            disabled
          />
        </div>
        <div className="contacts-container">
          <ControledPhoneNumberInput
            name="phone"
            placeholder="Enter your phone number"
            label="Phone Number"
            country="us"
            className="left"
          />
          <ControledLabeledInput
            name="email"
            placeholder="Enter your email"
            label="Email"
          />
        </div>
        <div className="form-btn-container">
          <Button
            background="transparent"
            border="gradient"
            onClick={onCancel}
            className="left"
          >
            cancel
          </Button>
          <Button background="gradient" onClick={formik.handleSubmit}>
            save
          </Button>
        </div>
      </div>
    </FormikProvider>
  );
};

ShippingInfoForm.propTypes = {
  data: object,
  onSubmit: func,
  onCancel: func,
};

export default ShippingInfoForm;
