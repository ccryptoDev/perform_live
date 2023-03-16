/**
 *
 * Tests for ProductGalleryItem
 *
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import ProductGalleryItem from '.';

describe('<ProductGalleryItem />', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      render(<ProductGalleryItem />, container);
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
