/**
 *
 * ShipingFrom Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './shippingFrom.dependencies';

const ShippingFrom = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/shipping-from',
    screen: ShippingFrom,
    isPrivate: true,
    sidebar: true,
    name: 'ShippingFrom',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
