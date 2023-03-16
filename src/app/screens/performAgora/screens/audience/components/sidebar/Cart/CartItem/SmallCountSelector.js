import React from 'react';
import PropTypes from 'prop-types';
import IMG from 'app/utils/images';

const SmallCountSelector = ({ decrementCount, incrementCount, value = 0 }) => {
  return (
    <div className="small-count-selector__container">
      <img
        src={IMG.MINUS_ICON}
        className="minus"
        alt="minus icon"
        onClick={decrementCount}
        onKeyPress={decrementCount}
        role="none"
      />
      <span className="small-count-selector__text">{value.toString()}</span>
      <img
        src={IMG.PLUS_ICON}
        className="plus"
        alt="plus icon"
        onClick={incrementCount}
        onKeyPress={incrementCount}
        role="none"
      />
    </div>
  );
};

SmallCountSelector.propTypes = {};

export default SmallCountSelector;
