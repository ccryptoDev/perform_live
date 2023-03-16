import React from 'react';
import { string, func } from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import { useField } from 'formik';
import IMG from '../../utils/images';

import './styles.scss';

const PhoneNumberInput = ({
  label,
  error,
  name,
  defaultCountry,
  required,
  useShadow,
  onChange,
  confirm,
  needFormat,
  className = '',
  ...rest
}) => (
  <div className={`phone-number-input input-container ${className}`}>
    <div className="input-title-point">
      {label && <div className="input-title">{label}</div>}
      {required && <img src={IMG.ALERT_POINT} className="require-point" />}
    </div>
    <div className="input mt-2 input__extraheight">
      <PhoneInput
        country={defaultCountry}
        autoFormat={needFormat ? true : false}
        onChange={onChange}
        inputProps={{ name }}
        inputClass="input__input input"
        buttonClass="button-dropdown"
        dropdownClass="country-dropdown"
        {...rest}
      />
      {confirm && <img className="check-icon right" src={IMG.CONFIRM_ICON} />}
      {!useShadow && <div className="input__shadow" />}
      <div className="input__border" />
    </div>
    {error && <div className="error-container">{error}</div>}
  </div>
);

PhoneNumberInput.propTypes = {
  label: string,
  name: string,
  error: string,
  defaultCountry: string,
  onChange: func,
};

export default PhoneNumberInput;

export const ControledPhoneNumberInput = ({
  onChange = () => null,
  value,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);

  return (
    <PhoneNumberInput
      {...props}
      name={field.name}
      onChange={(phoneNumber, country, e) => {
        setValue(phoneNumber);
        onChange(e);
      }}
      onBlur={field.onBlur}
      value={field.value || value}
      checked={field.checked}
      error={meta.error}
    />
  );
};
