/* Imports */

import React from 'react'
import { shallow } from 'enzyme'

import SearchInput, { Props } from './SearchInput'

/* Setups */

const defaultProps: Props = Object.freeze({
  resetButtonText: 'reset please',
  searchButtonText: 'search please',
  searchPlaceholder: 'placeholder text',
  searchText: 'search text',
  onSearch: jest.fn(),
})

const SELECTORS = {
  INPUT: '.search-input__input',
  RESET_BUTTON: '.search-input__reset-button',
  SEARCH_BUTTON: '.search-input__search-button',
}

beforeEach(() => {
  jest.resetAllMocks()
})

/* Tests */

test('renders default search text when set', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)

  expect(wrapper.find(SELECTORS.INPUT).prop('value')).toBe(defaultProps.searchText)
})

test('renders default search text when not set', () => {
  const wrapper = shallow(<SearchInput />)

  expect(wrapper.find(SELECTORS.INPUT).prop('value')).toBe('')
})

test('renders placeholder when set', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)

  expect(wrapper.find(SELECTORS.INPUT).prop('placeholder')).toBe(defaultProps.searchPlaceholder)
})

test('renders placeholder when not set', () => {
  const wrapper = shallow(<SearchInput />)

  expect(wrapper.find(SELECTORS.INPUT).prop('placeholder')).toBe('Search...')
})

test('renders reset button text when set', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)

  expect(wrapper.find(SELECTORS.RESET_BUTTON).text()).toBe(defaultProps.resetButtonText)
})

test('renders reset button text when not set', () => {
  const wrapper = shallow(<SearchInput />)

  expect(wrapper.find(SELECTORS.RESET_BUTTON).text()).toBe('Reset')
})

test('renders search button text when set', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)

  expect(wrapper.find(SELECTORS.SEARCH_BUTTON).text()).toBe(defaultProps.searchButtonText)
})

test('renders search button text when not set', () => {
  const wrapper = shallow(<SearchInput />)

  expect(wrapper.find(SELECTORS.SEARCH_BUTTON).text()).toBe('Search')
})

test('updates search text on change', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)
  wrapper.find(SELECTORS.INPUT).simulate('change', { target: { value: 'updated search text' } })

  expect(wrapper.find(SELECTORS.INPUT).prop('value')).toBe('updated search text')
})

test('calls back when search button is clicked without a search text update', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)
  wrapper.find(SELECTORS.SEARCH_BUTTON).simulate('click')

  expect(defaultProps.onSearch).toHaveBeenCalledTimes(0)
})

test('calls back when search button is clicked after a search text update', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)
  wrapper.find(SELECTORS.INPUT).simulate('change', { target: { value: 'updated search text' } })
  wrapper.find(SELECTORS.SEARCH_BUTTON).simulate('click')

  expect(defaultProps.onSearch).toHaveBeenCalledTimes(1)
  expect(defaultProps.onSearch).toHaveBeenCalledWith('updated search text')
})

test('calls back when reset button is clicked without a search text update', () => {
  const wrapper = shallow(<SearchInput {...{ ...defaultProps, searchText: '' }} />)
  wrapper.find(SELECTORS.RESET_BUTTON).simulate('click')

  expect(defaultProps.onSearch).toHaveBeenCalledTimes(0)
})

test('calls back when reset button is clicked after a search text update', () => {
  const wrapper = shallow(<SearchInput {...defaultProps} />)
  wrapper.find(SELECTORS.INPUT).simulate('change', { target: { value: 'updated search text' } })
  wrapper.find(SELECTORS.RESET_BUTTON).simulate('click')

  expect(defaultProps.onSearch).toHaveBeenCalledTimes(1)
  expect(defaultProps.onSearch).toHaveBeenCalledWith('')
})
