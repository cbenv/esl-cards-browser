/* Imports */

import React from 'react'
import { shallow } from 'enzyme'

import Alert from './Alert'

/* Tests */

test('renders children', () => {
  const wrapper = shallow(<Alert level="info">test alert</Alert>)

  expect(wrapper.children().text()).toBe('test alert')
})

test('renders info alert', () => {
  const wrapper = shallow(<Alert level="info" />)

  expect(wrapper.hasClass('alert'))
  expect(wrapper.hasClass('alert-level'))
})

test('renders warn alert', () => {
  const wrapper = shallow(<Alert level="warn" />)

  expect(wrapper.hasClass('alert'))
  expect(wrapper.hasClass('alert-warn'))
})

test('renders error alert', () => {
  const wrapper = shallow(<Alert level="error" />)

  expect(wrapper.hasClass('alert'))
  expect(wrapper.hasClass('alert-error'))
})
