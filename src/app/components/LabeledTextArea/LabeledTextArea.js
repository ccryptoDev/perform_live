import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import './LabeledTextArea.scss';

const LabeledTextArea = ({ 
  label, 
  error, 
  maxLength, 
  value, 
  useShadow,
  ...rest 
}) => (
  <div className="textarea-container">
    <div className="pre-field">
      {label && <div className="textarea-title">{label}</div>}
      {maxLength && (
        <div className="textarea-counter">
          {(value || '').length} / {maxLength}
        </div>
      )}
    </div>
    <div className="input mt-2">
      <textarea
        className="input__input input"
        maxLength={maxLength}
        value={value}
        {...rest}
      />
      {!useShadow && <div className="input__shadow" />}
      <div className="input__border" />
    </div>
    {error && <div className="textarea-title error-container">{error}</div>}
  </div>
);

LabeledTextArea.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  prepend: PropTypes.string,
};

export default LabeledTextArea;

export const ControledLabeledTextArea = ({
  onChange = () => null,
  value,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <LabeledTextArea
      {...props}
      name={field.name}
      onChange={e => {
        field.onChange(e);
        onChange(e);
      }}
      onBlur={field.onBlur}
      value={field.value || value}
      checked={field.checked}
      error={meta.touched && meta.error}
    />
  );
};
