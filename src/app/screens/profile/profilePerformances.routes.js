import { lazy } from 'react';

const Profile = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/my-performances',
    screen: Profile,
    isPrivate: true,
    sidebar: true,
    name: 'Profile',
  },
];
