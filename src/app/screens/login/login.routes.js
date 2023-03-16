/**
 *
 * Login Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { SocialLogin } from '../../components/SocialLogins/SocialLogin/SocialLogin';
import { IMG } from './login.dependencies';

const Login = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/login',
    screen: Login,
    isPrivate: false,
    sidebar: false,
    name: 'Login',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },

  {
    exact: true,
    path: '/linkedin',
    screen: SocialLogin,
    isPrivate: false,
    sidebar: false,
    name: 'SocialLogin',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
  {
    exact: true,
    path: '/twitter',
    screen: SocialLogin,
    isPrivate: false,
    sidebar: false,
    name: 'SocialLogin',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
