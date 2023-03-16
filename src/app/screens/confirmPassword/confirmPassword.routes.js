/**
 *
 * ConfirmPassword Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './confirmPassword.dependencies';

const ConfirmPassword = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/resetPassword/code/:code',
    screen: ConfirmPassword,
    isPrivate: false,
    sidebar: false,
    name: 'ConfirmPassword',
    routeMatch: '/resetPassword/code/',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
