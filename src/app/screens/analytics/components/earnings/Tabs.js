import React from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

const Tabs = ({ tabs }) => {
  return (
    <div className="tabs">
      {tabs.map(tab => {
        return (
          <button className="tab" key={tab} type="button">
            {tab}
          </button>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  tabs: propTypes.array,
};

export default Tabs;
