import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './UserProfile';

describe('<UserProfile />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <UserProfile onRefreshMaster={jest.fn()} onLogout={jest.fn()} />,
    );
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render user dropdown on clicking name/pic', () => {
    component
      .find('.profile-btn-container')
      .at(0)
      .simulate('click');
    expect(component.state().isBtnActive).toBe(true);
  });

  it('should hide user dropdown when isBtnActive is set to false', () => {
    component.setState({
      isBtnActive: true,
    });
    component
      .find('.profile-btn-container')
      .at(0)
      .simulate('click');
    expect(component.state().isBtnActive).toBe(false);
  });

  it('should call f(onLogout) on clicking `Logout` from user dropdown menu', () => {
    component.setState({
      isBtnActive: true,
    });
    const onLogout = jest.spyOn(component.instance().props, 'onLogout');
    component
      .find('.dd-item')
      .at(0)
      .simulate('click');
    expect(onLogout).toHaveBeenCalled();
  });

  it('Set state  on accordion to display details', () => {
    component.setState({ isBtnActive: true });
    const profileDDNode = component.find('.btn-dd-container');
    component.instance().profileDDNode = profileDDNode;
    component.instance().handleOutsideClick({ target: <div> </div> });
    expect(component.state().isBtnActive).toBe(false);
  });
  it('Set state  on accordion to display without profilenode', () => {
    component.setState({ isBtnActive: true });
    component.instance().profileDDNode = null;
    component.instance().handleOutsideClick({ target: <div> </div> });
    expect(component.state().isBtnActive).toBe(true);
  });

  it('Set state  on onRefreshMaster ', () => {
    component.setState({ isBtnActive: true });
    component.instance().onRefreshMaster();
    expect(component.state().isBtnActive).toBe(false);
  });
});
