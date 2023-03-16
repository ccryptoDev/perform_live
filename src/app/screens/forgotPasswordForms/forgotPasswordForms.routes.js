/**
 *
 * ForgotPasswordForms Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './forgotPasswordForms.dependencies';

const ForgotPasswordForms = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/forgetPassword',
    screen: ForgotPasswordForms,
    isPrivate: false,
    sidebar: false,
    name: 'ForgotPasswordForms',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
