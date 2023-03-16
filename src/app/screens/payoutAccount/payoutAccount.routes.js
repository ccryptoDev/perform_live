/**
 *
 * PayoutAccount Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './payoutAccount.dependencies';

const PayoutAccount = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/payout-account',
    screen: PayoutAccount,
    isPrivate: true,
    sidebar: true,
    name: 'PayoutAccount',
  },
];
