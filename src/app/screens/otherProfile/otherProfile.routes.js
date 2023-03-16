import { lazy } from 'react';

const OtherProfile = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/otherprofile',
    screen: OtherProfile,
    isPrivate: true,
    sidebar: true,
    name: 'OtherProfile',
  },
];