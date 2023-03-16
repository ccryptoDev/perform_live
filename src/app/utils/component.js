import { compose } from 'redux';
import withAuthCheck from 'app/hoc/AuthRouteCheck';
import withSidebarCheck from 'app/hoc/SidebarStateCheck';

export const getHOCWrappedComponent = (component, routeObj) =>
  compose(
    withAuthCheck(routeObj.isPrivate),
    withSidebarCheck(),
  )(component, routeObj.name);
