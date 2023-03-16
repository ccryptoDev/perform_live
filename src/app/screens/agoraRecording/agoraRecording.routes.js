/**
 *
 * AgoraRecording Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { IMG } from './agoraRecording.dependencies';

const AgoraRecording = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: '/agorarecording/:id',
    screen: AgoraRecording,
    isPrivate: false,
    sidebar: false,
    name: 'AgoraRecording',
    routeMatch: '/agorarecording',
    icon: IMG.IC_DASHBOARD, // TODO: Change the Screen icon here
  },
];
