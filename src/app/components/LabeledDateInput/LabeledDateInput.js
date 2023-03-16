/**
 *
 * LabeledDateInput
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import './LabeledDateInput.scss';
import DatePicker from 'react-datepicker';
import IMG from 'app/utils/images';
import Calendar from 'react-calendar';
import { useField } from 'formik';

export const LabeledDateInput = ({
  className = '',
  label,
  error,
  value,
  onChange,
  view = 'month',
  ...rest
}) => {
  return (
    <div className={`datepicker-input-container ${className}`}>
      <div className="pre-field">
        {label && <div className="input-title">{label}</div>}
      </div>

      <div className="input calendar-input-wrapper mt-2">
        <img src={IMG.PLAN_CALENDER} className="calendar" alt="calendar" />
        <DatePicker
          selected={value}
          className="input__input input"
          onChange={onChange}
        />
        <img className="dropdown" src={IMG.PLAN_DROPDOWN} alt="dropdown" />
        <div className="input__shadow" />
        <div className="input__border" />
      </div>

      {error && <div className="input-title error-container">{error}</div>}
    </div>
  );
};

LabeledDateInput.propTypes = {};

export default LabeledDateInput;

export const ControlledLabeledDateInput = ({
  onChange = () => null,
  value,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);

  return (
    <LabeledDateInput
      {...props}
      name={field.name}
      onChange={e => {
        setValue(e);
        onChange(e);
      }}
      onBlur={field.onBlur}
      value={field.value || value}
      error={meta.touched && meta.error}
    />
  );
};
