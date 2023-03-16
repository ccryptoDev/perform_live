import React from 'react';
import { shallow } from 'enzyme';
import BrowserCheck from '.';

describe('BrowserCheck Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserCheck />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should close Browser check warning modal on clicking Close', () => {
    wrapper.find('Modal').prop('closeModal')();
    expect(wrapper.state().isModalOpen).toEqual(false);
  });
});
