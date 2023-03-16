import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip as TooltipBootstrap } from 'react-bootstrap';
import './Tooltip.scss';

export const Tooltip = ({ tooltipOverlay, placement, children }) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<TooltipBootstrap>{tooltipOverlay}</TooltipBootstrap>}
    >
      {children}
    </OverlayTrigger>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  tooltipOverlay: PropTypes.node,
  placement: PropTypes.string,
};

export default Tooltip;
