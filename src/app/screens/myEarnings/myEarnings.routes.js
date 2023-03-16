/**
 *
 * MyEarnings Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './myEarnings.dependencies';

const MyEarnings = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/myearnings',
    screen: MyEarnings,
    isPrivate: true,
    sidebar: true,
    name: 'MyEarnings',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
