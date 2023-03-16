import React from 'react';
import { shallow } from 'enzyme';
import CookiesConsentMessage from './CookiesConsentMessage';

describe('CookiesConsentMessage Component', () => {
  let wrapper;
  const defaultFunction = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CookiesConsentMessage isModalOpen closeModal={defaultFunction} />,
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
