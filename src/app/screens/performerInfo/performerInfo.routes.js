/**
 *
 * Products Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';

const PerformerInfo = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/performer-info',
    screen: PerformerInfo,
    isPrivate: true,
    sidebar: true,
    name: 'PerformerInfo',
  },
];
