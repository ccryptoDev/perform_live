import React, { useState, useRef } from 'react';
import { string } from 'prop-types';
import './LabeledInput.scss';
import { useField } from 'formik';
import IMG from '../../utils/images';

const LabeledInput = ({
  prefix,
  label,
  error,
  warning,
  maxLength,
  value,
  icon,
  confirm,
  required,
  useShadow,
  readOnly = false,
  password,
  className = '',
  ...rest
}) => {
  const input = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    const type = input.current.type;
    if (type == 'password') input.current.type = 'text';
    else input.current.type = 'password';
  };
  return (
    <div className="input-container">
      <div className="pre-field">
        <div className="input-title-point">
          {label && <div className="input-title">{label}</div>}
          {required && <img src={IMG.ALERT_POINT} className="require-point" />}
        </div>
        {maxLength && (
          <div className="input-counter">
            {(value || '').length} / {maxLength}
          </div>
        )}
      </div>
      <div className={`input mt-2 ${className}`}>
        {icon && <img src={icon} alt="icon" className="icon" />}
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          ref={input}
          className="input__input input"
          maxLength={maxLength}
          value={value}
          readOnly={readOnly}
          {...rest}
        />
        {confirm && <img className="check-icon right" src={IMG.CONFIRM_ICON} />}
        {password && (
          <img
            className="check-icon right"
            src={(open && IMG.EYE_CLOSE) || IMG.EYE_OPEN}
            onClick={handleOpen}
          />
        )}
        {!useShadow && <div className="input__shadow" />}
        {error ? (
          <div className="input__border error" />
        ) : (
          <div className="input__border" />
        )}
      </div>
      {error && <div className="error-container">{error}</div>}
      {warning && (
        <div
          className={(error && 'error-container') || 'error-container warning'}
        >
          {warning}
        </div>
      )}
    </div>
  );
};

LabeledInput.propTypes = {
  prefix: string,
  title: string,
  name: string,
  error: string,
  prepend: string,
  icon: string,
  className: string,
};

export default LabeledInput;

export const ControledLabeledInput = ({
  onChange = () => null,
  value,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <LabeledInput
      {...props}
      name={field.name}
      onChange={e => {
        field.onChange(e);
        onChange(e);
      }}
      onBlur={field.onBlur}
      value={field.value || value || ''}
      checked={field.checked}
      error={meta.touched && meta.error}
    />
  );
};
