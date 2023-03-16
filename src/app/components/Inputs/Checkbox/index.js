import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = ({ label, className, isInvalid, ...props }) => (
  <div
    className={[
      'pl-checkbox form-checkbox',
      isInvalid ? 'is-invalid' : null,
      className,
    ].join(' ')}
  >
    <label>
      {label}
      <input type="checkbox" {...props} />
      <span className="checkmark" />
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  isInvalid: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Checkbox;
