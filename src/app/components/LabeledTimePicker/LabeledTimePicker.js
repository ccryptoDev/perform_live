import React, { useState } from 'react';
import './LabeledTimePicker.scss';
import _ from 'lodash';
// import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TimePicker } from '../TimePicker';
import { getTimeObjectFromDate } from '../../utils/date-helper';

export const LabeledTimePicker = ({ value, label, error, onChange }) => {
  const [opened, setOpened] = useState(false);
  const { hour, minute, ampm } = getTimeObjectFromDate(value);

  return (
    <div className="time-picker-wrapper">
      <div className="pre-field">
        {label && <div className="input-title">{label}</div>}
      </div>
      <div className="input time-picker">
        <div className="input__input" onClick={() => setOpened(o => !o)}>
          {_.padStart(hour, 2, 0)}:{_.padStart(minute, 2, 0)} | {ampm}
        </div>
        <div className="input__shadow" />
        <div className="input__border" />
      </div>
      {error && <div className="input-title error-container">{error}</div>}

      {opened && (
        <TimePicker
          onTimeFieldChange={onChange}
          date={value}
          onHide={() => setOpened(null)}
        />
      )}
    </div>
  );
};

LabeledTimePicker.propTypes = {};

export default LabeledTimePicker;

export const ControledLabeledTimePicker = ({
  onChange = () => null,
  value,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);

  return (
    <LabeledTimePicker
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
