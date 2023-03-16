import { lazy } from 'react';
import IMG from 'app/utils/images';

const Favorites = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/favorites',
    screen: Favorites,
    isPrivate: true,
    sidebar: true,
    name: 'Favorites',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
