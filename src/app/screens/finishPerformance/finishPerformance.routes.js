/**
 *
 * FinishPerformance Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './finishPerformance.dependencies';

const FinishPerformance = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/finishperformance/:id',
    screen: FinishPerformance,
    isPrivate: true,
    sidebar: false,
    name: 'FinishPerformance',
    routeMatch: '/finishperformance',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
