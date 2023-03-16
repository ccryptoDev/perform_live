import React from 'react';
import PropTypes from 'prop-types';
import IMG from 'app/utils/images';
import cn from 'classnames';

import './Button.scss';

export const Button = ({
  type = 'primary',
  size = 'default',
  background = 'gradient',
  border,
  fontSize,
  onClick = () => null,
  disabled = false,
  suffix,
  prefix,
  textColor,
  className,
  btnType = 'button',
  children,
  spinner,
}) => {
  let btnClasses = cn(
    'btn',
    `btn-${type}`,
    `btn-${size}`,
    `btn-bg-${background}`,
    className,
  );

  if (border) btnClasses += ` btn-border-${border} `;
  if (textColor) btnClasses += ` btn-text-${textColor} `;

  return (
    <button
      className={btnClasses}
      type={btnType}
      onClick={onClick}
      disabled={disabled}
      style={{ fontSize: fontSize || '15px' }}
    >
      {spinner ? (
        <div className="button-spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      ) : (
        <>
          {prefix}
          {children}
          {suffix}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  fontSize: PropTypes.string,
  background: PropTypes.string,
  textColor: PropTypes.string,
  border: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  btnType: PropTypes.string,
  spinner: PropTypes.bool,
};

export default Button;

export const NextButton = ({ children, ...props }) => (
  <Button {...props} suffix={<img src={IMG.PLAN_NEXT_ARROW} alt="next icon" />}>
    {children}
  </Button>
);

NextButton.propTypes = {
  children: PropTypes.node,
};

export const PrevButton = ({ children, ...props }) => (
  <Button {...props} prefix={<img src={IMG.PLAN_BACK_ARROW} alt="prev icon" />}>
    {children}
  </Button>
);

PrevButton.propTypes = {
  children: PropTypes.node,
};
