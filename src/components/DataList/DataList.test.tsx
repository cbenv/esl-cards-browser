/* Imports */

import React from 'react'
import { shallow } from 'enzyme'

import DataList from './DataList'

/* Tests */

test('renders valid data', () => {
  const data = {
    field1: 'value1',
    field2: 'value2',
    fieldUndefined: undefined,
    field3: 'value3',
    fieldNothing: '',
  }
  const wrapper = shallow(<DataList data={data} />)

  expect(wrapper.children().length).toBe(3)

  expect(wrapper.childAt(0).find('.data-list__key').text()).toBe('field1')
  expect(wrapper.childAt(0).find('.data-list__value').text()).toBe('value1')

  expect(wrapper.childAt(1).find('.data-list__key').text()).toBe('field2')
  expect(wrapper.childAt(1).find('.data-list__value').text()).toBe('value2')

  expect(wrapper.childAt(2).find('.data-list__key').text()).toBe('field3')
  expect(wrapper.childAt(2).find('.data-list__value').text()).toBe('value3')
})
