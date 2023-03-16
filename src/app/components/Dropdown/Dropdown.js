import { useField } from 'formik';
import React from 'react';
import Select from 'react-select';
import IMG from '../../utils/images';
import './Dropdown.scss';

const commonTextStyles = {
  color: '#10080F',
  fontSize: 15,
  marginLeft: 10,
};

const customStyles = {
  option: provided => ({
    ...provided,
    borderBottom: '1px dotted gray',
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    margin: '0 20px',
    width: 'auto',
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 'bold',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  menu: provided => ({
    ...provided,
    borderRadius: 24,
  }),
  input: provided => ({
    ...provided,
    ...commonTextStyles,
  }),
  control: provided => ({
    ...provided,
    borderRadius: 24,
    backgroundColor: 'white',
    // border: '1px solid rgba(255, 255, 255, 0.15)',
  }),
  placeholder: provided => ({
    ...provided,
    ...commonTextStyles,
    opacity: 0.4,
  }),
  singleValue: provided => ({
    ...provided,
    ...commonTextStyles,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: 'hsl(0, 0%, 80%)',
  }),
  indicatorSeparator: () => ({}),
};

const Dropdown = ({ label, error, required, ...props }) => (
  <div className="dropdown-container">
    <div className="input-title-point">
      {label && <div className="input-title">{label}</div>}
      {required && <img className="require-point" src={IMG.ALERT_POINT} />}
    </div>
    <Select styles={customStyles} {...props} />
    {error && <div className="input-title error-container">{error}</div>}
  </div>
);

export default Dropdown;

export const ControlledDropdown = ({
  onChange = () => null,
  value,
  options,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);

  const optionValue = options.find(
    el =>
      el.value.toString().toLowerCase() ===
      (field.value || value || '').toString().toLowerCase(),
  );

  return (
    <Dropdown
      {...props}
      name={field.name}
      onChange={option => {
        setValue(option.value);
        onChange(option.value);
      }}
      onBlur={field.onBlur}
      value={optionValue}
      checked={field.checked}
      error={meta.touched && meta.error}
      options={options}
    />
  );
};
