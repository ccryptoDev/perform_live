/**
 *
 * ProductManagement Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './productManagement.dependencies';

const ProductManagement = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/productmanagement',
    screen: ProductManagement,
    isPrivate: true,
    sidebar: true,
    name: 'ProductManagement',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
