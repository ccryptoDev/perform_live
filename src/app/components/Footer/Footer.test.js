import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation(init => [init, setState]);

describe('<Footer />', () => {
  it('renders correctly', () => {
    expect(
      shallow(
        <Footer
          menuItems={[
            {
              exact: true,
              path: null,
              screen: true,
              sidebar: true,
              name: 'Open',
              icon: true,
              iconActive: true,
              isPrivate: true,
            },
          ]}
        />,
      ),
    ).toMatchSnapshot();
  });
});
