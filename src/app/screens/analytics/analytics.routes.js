/**
 *
 * Analytics Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';

const Analytics = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/analytics',
    screen: Analytics,
    isPrivate: true,
    sidebar: true,
    name: 'Analytics',
    icon: null, // TODO: Change the Screen icon here
  },
];
