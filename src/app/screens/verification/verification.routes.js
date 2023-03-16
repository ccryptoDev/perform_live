/**
 *
 * Privacy Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */
 import { lazy } from 'react';

 const Verification = lazy(() => import('.'));
 
 export default [
   {
     exact: true,
     path: '/verification',
     screen: Verification,
     isPrivate: false,
     sidebar: false,
     header: false,
     footer: false,
     routeMatch: '/verification',
     name: 'Verification',
   },
 ];
 