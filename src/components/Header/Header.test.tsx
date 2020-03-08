/* Imports */

import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

/* Tests */

test('renders children', () => {
  const wrapper = shallow(<Header>test header</Header>)

  expect(wrapper.children().text()).toBe('test header')
})
