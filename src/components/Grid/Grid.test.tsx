/* Imports */

import React from 'react'
import { shallow } from 'enzyme'

import Grid from './Grid'

/* Tests */

test('renders children', () => {
  const wrapper = shallow(<Grid>test grid</Grid>)

  expect(wrapper.children().text()).toBe('test grid')
})
