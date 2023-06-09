/**
 *
 * Tests for ShareBarSmall
 *
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import ShareBarSmall from '.';

describe('<ShareBarSmall />', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      render(<ShareBarSmall />, container);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders correctly and match snapshot', async () => {
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
