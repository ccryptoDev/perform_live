/**
 *
 * ProductCreate Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './productCreate.dependencies';

const ProductCreate = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/productcreate',
    screen: ProductCreate,
    isPrivate: true,
    sidebar: false,
    name: 'ProductCreate',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
