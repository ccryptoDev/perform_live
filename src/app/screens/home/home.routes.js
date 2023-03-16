/**
 *
 * Home Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './home.dependencies';

const Home = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/',
    screen: Home,
    isPrivate: false,
    sidebar: true,
    name: 'Home',
  },

  // {
  //   exact: true,
  //   path: '/live',
  //   screen: Home,
  //   isPrivate: false,
  //   sidebar: true,
  //   name: 'Home',
  // },
  // {
  //   exact: true,
  //   path: '/upcoming',
  //   screen: Home,
  //   isPrivate: false,
  //   sidebar: true,
  //   name: 'Home',
  // },
  // {
  //   exact: true,
  //   path: '/popular',
  //   screen: Home,
  //   isPrivate: false,
  //   sidebar: true,
  //   name: 'Home',
  // },
];
