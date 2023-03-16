import { lazy } from 'react';

const Profile = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/myprofile',
    screen: Profile,
    isPrivate: true,
    sidebar: true,
    name: 'Profile',
  },
];