import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import configureStore from '../store';
import { Routes } from './routesWrapper';

describe('<Routes />', () => {
  let component;
  const { store } = configureStore({});

  beforeEach(() => {
    component = shallow(<Routes siteId="1" />);
  });

  it('Routes component renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Routes siteId="1" />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render routes with PageHeader and SideDrawer if accessToken is set', () => {
    component.setProps({ accessToken: 'abcd' });
    component.update();
    const layoutContainer = component.find('.layout-container');
    expect(layoutContainer.length).toBe(1);
  });
});
