/**
 *
 * Signup Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './signup.dependencies';

const Signup = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/signup',
    screen: Signup,
    isPrivate: false,
    sidebar: false,
    name: 'Signup',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
