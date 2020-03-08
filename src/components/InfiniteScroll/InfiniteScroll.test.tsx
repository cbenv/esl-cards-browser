/* Imports */

import React from 'react';
import { shallow } from 'enzyme';

import InfiniteScroll from './InfiniteScroll';

/* Tests */

test('renders children', () => {
  const wrapper = shallow(<InfiniteScroll>test scroll</InfiniteScroll>);

  expect(wrapper.childAt(0).text()).toBe('test scroll');
});
