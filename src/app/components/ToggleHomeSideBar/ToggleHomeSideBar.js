/**
 *
 * ToggleHomeSideBar
 *
 */

import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setHomeSideBarState } from '../../state/app.actions';

export const ToggleHomeSideBar = ({ sideBarState }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHomeSideBarState(sideBarState));
    return () => {
      dispatch(setHomeSideBarState(true));
    };
    // Can be treated as mount/unmount hook, or update hook if observable is passed in 2nd argument.
  }, []); // Add observable in array if you want the hook to run on updating those values

  return <></>;
};

ToggleHomeSideBar.propTypes = {
  sideBarState: PropTypes.bool,
};

export default memo(ToggleHomeSideBar);
