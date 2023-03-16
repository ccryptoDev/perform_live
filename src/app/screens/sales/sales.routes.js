import { lazy } from 'react';

const Sales = lazy(() => import('.'));

export default [
  {
    exact: true,
    path: '/sales',
    screen: Sales,
    isPrivate: true,
    sidebar: true,
    name: 'Sales',
  },
];
