/**
 *
 * CountSelector
 *
 */

import { useField } from 'formik';
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import IMG from '../../utils/images';
import './CountSelector.scss';

export const CountSelector = ({
  value = 0,
  label,
  onChange,
  min = -Infinity,
  max = Infinity,
  error,
  ...props
}) => {
  const decrementCount = () => {
    const newValue = parseInt(value) - 1;
    onChange(newValue < min ? min : newValue);
  };

  const incrementCount = () => {
    const newValue = parseInt(value) + 1;
    onChange(newValue > max ? max : newValue);
  };

  return (
    <div className="counter-selector-container">
      {label && <div className="input-title">{label}</div>}
      <div className="count-selector__container">
        <img
          src={IMG.MINUS_ICON}
          className="minus"
          alt="minus icon"
          onClick={decrementCount}
          onKeyPress={() => {}}
          role="none"
        />
        <input
          className="count-selector__text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <img
          src={IMG.PLUS_ICON}
          className="plus"
          alt="plus icon"
          onClick={incrementCount}
          onKeyPress={() => {}}
          role="none"
        />
      </div>
      {error && <div className="input-title error-container">{error}</div>}
    </div>
  );
};

CountSelector.propTypes = {};

export default CountSelector;

export const ControlledCountSelector = ({
  onChange = () => null,
  value,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);

  return (
    <CountSelector
      {...props}
      name={field.name}
      onChange={value => {
        // field.onChange(value);
        setValue(value);
        onChange(value);
      }}
      value={field.value || value}
      error={meta.error}
    />
  );
};
