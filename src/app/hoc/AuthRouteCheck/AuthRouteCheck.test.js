import React from 'react';
import { shallow } from 'enzyme';
import { withAuthCheck } from './AuthRouteCheck';
jest.useFakeTimers();
describe('<AuthRouteCheck />', () => {
  it('renders correctly', () => {
    jest.runOnlyPendingTimers();
    expect(shallow(<withAuthCheck accessToken="123" />)).toMatchSnapshot();
  });
});
