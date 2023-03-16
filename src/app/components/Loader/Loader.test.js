import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('<Loader />', () => {
  it('renders correctly', () => {
    expect(shallow(<Loader />)).toMatchSnapshot();
  });
});
