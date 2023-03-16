/**
 *
 * PerformAgora Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './performAgora.dependencies';

const PerformAgora = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/performlive/:id/performer/:performerId',
    screen: PerformAgora,
    isPrivate: true,
    sidebar: false,
    name: 'PerformAgora',
    routeMatch: '/performlive',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
