/* Imports */

import React from 'react';
import { shallow } from 'enzyme';

import Main from './Main';

/* Tests */

test('renders children', () => {
  const wrapper = shallow(<Main>test main</Main>);

  expect(wrapper.children().text()).toBe('test main');
});
