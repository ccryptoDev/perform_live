/**
 *
 * PerformanceScheduler Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './performanceScheduler.dependencies';

const PerformanceScheduler = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/performancescheduler',
    screen: PerformanceScheduler,
    isPrivate: true,
    sidebar: false,
    name: 'PerformanceScheduler',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
  {
    exact: true,
    path: '/performance/edit/:id',
    screen: PerformanceScheduler,
    isPrivate: true,
    sidebar: false,
    name: 'PerformanceScheduler',
    routeMatch: '/performance/edit',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
