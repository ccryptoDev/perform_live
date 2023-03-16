import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary Component', () => {
  let wrapper;
  const props = { history: { listen: jest.fn() } };
  beforeEach(() => {
    wrapper = shallow(
      <ErrorBoundary {...props}>
        <Card>App</Card>
      </ErrorBoundary>,
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has the default error-state set to false', () => {
    expect(wrapper.instance().state.hasError).toBe(false);
  });

  it('renders the ErrorBoundary when error is caught', () => {
    wrapper.instance().setState({ hasError: true });
    expect(wrapper.instance().state.hasError).toBe(true);
  });

  it('componentDidCatch should be called on catching error', () => {
    const componentDidCatch = jest.spyOn(
      wrapper.instance(),
      'componentDidCatch',
    );
    const error = new Error('test');

    wrapper.find('Card').simulateError(error);
    expect(componentDidCatch).toHaveBeenCalled();
  });
});
