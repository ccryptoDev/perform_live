import React from 'react';
import { shallow } from 'enzyme';
import InitGTM from '.';

describe('InitGTM Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<InitGTM gtmId="ABCD" />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
