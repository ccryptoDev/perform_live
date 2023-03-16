/**
 *
 * Products Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';

const Products = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/products',
    screen: Products,
    isPrivate: true,
    sidebar: true,
    name: 'Products',
  },
];
