/**
 *
 * Privacy Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */
import { lazy } from 'react';

const UserAgreement = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/userAgreement',
    screen: UserAgreement,
    isPrivate: false,
    sidebar: false,
    header: false,
    footer: false,
    routeMatch: '/userAgreement',
    name: 'UserAgreement',
  },
];
