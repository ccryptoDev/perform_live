/**
 *
 * PaymentShipping Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './paymentShipping.dependencies';

const PaymentShipping = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/payment-shipping',
    screen: PaymentShipping,
    isPrivate: true,
    sidebar: true,
    name: 'PaymentShipping',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
