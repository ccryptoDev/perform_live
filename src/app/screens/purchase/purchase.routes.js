import { lazy } from 'react';
import IMG from 'app/utils/images';

const Purchase = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/purchase',
    screen: Purchase,
    isPrivate: true,
    sidebar: true,
    name: 'Purchase',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
