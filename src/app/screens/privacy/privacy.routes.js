/**
 *
 * Privacy Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */
import { lazy } from 'react';

const Privacy = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/privacy',
    screen: Privacy,
    isPrivate: false,
    sidebar: false,
    header: false,
    footer: false,
    routeMatch: '/privacy',
    name: 'Privacy',
  },
];
