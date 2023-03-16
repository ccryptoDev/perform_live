import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = ({
  className,
  isInvalid,
  prepend,
  error,
  ...rest
}) => (
  <div
    className={['form-group', isInvalid ? 'is-invalid' : null, className].join(
      ' ',
    )}
  >
    <div className="input-group">
      {prepend && (
        <div className="input-group-prepend">
          <img src={prepend} alt="" />
        </div>
      )}
      <input className="form-control" {...rest} />
    </div>
    <div className="invalid-feedback">{error}</div>
  </div>
);

TextInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  prepend: PropTypes.string,
  isInvalid: PropTypes.bool,
};

export default TextInput;
