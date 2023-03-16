import { lazy } from 'react';
import IMG from 'app/utils/images';

const PurchaseDetails = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/purchase/:id',
    screen: PurchaseDetails,
    isPrivate: true,
    sidebar: true,
    name: 'PurchaseDetails',
    routeMatch: '/purchase',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
