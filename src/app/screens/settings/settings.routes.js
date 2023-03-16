/**
 *
 * Settings Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './settings.dependencies';

const Settings = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/settings',
    screen: Settings,
    isPrivate: true,
    sidebar: true,
    name: 'Settings',
  },
];
