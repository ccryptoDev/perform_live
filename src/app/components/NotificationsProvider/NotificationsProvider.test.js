import React from 'react';
import { shallow } from 'enzyme';
import { NotificationsProvider } from './NotificationsProvider';

describe('NotificationsProvider Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NotificationsProvider
        subscribeTokenToTopic={jest.fn()}
        setFirebaseDeviceToken={jest.fn()}
        getDeviceToken={jest.fn()}
      />,
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('getTokenFromFirebase function call ', () => {
    const getDeviceToken = jest.fn();
    wrapper.setProps({
      getDeviceToken,
      accessToken: null,
      deviceToken: '234',
    });
    wrapper.instance().getTokenFromFirebase({ getToken: () => '123' });
    expect(getDeviceToken).not.toHaveBeenCalled();
  });
});
