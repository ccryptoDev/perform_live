import React from 'react';
import PropTypes from 'prop-types';
import CircularSpinner from '../../../../../../../components/CircularSpinner';

const SidebarSpinner = ({ message }) => {
  return (
    <div className="sidebar-full-spinner">
      <CircularSpinner />
      {message && (
        <div className="sidebar-full-spinner__message">{message}</div>
      )}
    </div>
  );
};

SidebarSpinner.propTypes = {};

export default SidebarSpinner;
