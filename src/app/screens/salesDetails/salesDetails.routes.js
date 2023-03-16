import { lazy } from 'react';
import IMG from 'app/utils/images';

const SalesDetails = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/sales/:id',
    screen: SalesDetails,
    isPrivate: true,
    sidebar: true,
    name: 'SalesDetails',
    routeMatch: '/sales',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
