import React from 'react';
import { shallow } from 'enzyme';
import Modal from '.';

describe('Modal Component', () => {
  let wrapper;

  it('renders correctly', () => {
    wrapper = shallow(
      <Modal isModalOpen closeModal={jest.fn()} closeOnOuterClick />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with outer-click disabled', () => {
    wrapper = shallow(<Modal isModalOpen closeModal={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
