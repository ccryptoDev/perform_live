/**
 *
 * Privacy Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */
 import { lazy } from 'react';

 const Faq = lazy(() => import('.'));
 
 export default [
   {
     exact: true,
     path: '/faq',
     screen: Faq,
     isPrivate: false,
     sidebar: false,
     header: false,
     footer: false,
     routeMatch: '/faq',
     name: 'Faq',
   },
 ];
 