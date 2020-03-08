/* Imports */

import { act } from 'react-dom/test-utils'
import React from 'react'
import { shallow, mount, ReactWrapper } from 'enzyme'

import { Alert, App, Card, Header, Grid, InfiniteScroll, Main, SearchInput } from '..'
import { allCards } from '../../../test/mocks/cards'
import { GetCardsListResponse } from '../../interfaces'

/* Setup */

const mockGetCardsResponse: GetCardsListResponse = {
  cards: allCards,
  _pageSize: Math.max(allCards.length, 20),
  _totalCount: allCards.length,
}

beforeEach(() => {
  fetchMock.resetMocks()
})

/* Tests */

test('renders required components', () => {
  const wrapper = shallow(<App />)

  expect(wrapper.find(Header).exists())
  expect(wrapper.find(Main).exists())
  expect(wrapper.find(Main).find(InfiniteScroll).exists())
  expect(wrapper.find(Main).find(InfiniteScroll).find(SearchInput).exists())
  expect(wrapper.find(Main).find(InfiniteScroll).find(Grid).exists())
})

test('fetches cards on mount', (done) => {
  fetchMock.mockResponse(JSON.stringify(mockGetCardsResponse))

  act(() => {
    mount(<App />)
    return Promise.resolve()
  }).then(() => {
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('https://api.elderscrollslegends.io/v1/cards?name=&page=1&pageSize=20')
    done()
  })
})

test('renders cards after successful fetch and renders info when all cards have been fetched', (done) => {
  let wrapper: ReactWrapper
  fetchMock.mockResponse(JSON.stringify(mockGetCardsResponse))

  act(() => {
    wrapper = mount(<App />)
    return Promise.resolve()
  }).then(() => {
    wrapper.update()
    expect(wrapper.find(Card).length).toBe(allCards.length)
    expect(wrapper.find(Alert).hasClass('info'))
    expect(wrapper.find(Alert).text()).toBe('You have reached the end of the results')
    done()
  })
})

test('renders error alert when fetch is unsuccessful', (done) => {
  let wrapper: ReactWrapper
  fetchMock.mockReject()

  act(() => {
    wrapper = mount(<App />)
    return Promise.resolve()
  }).then(() => {
    wrapper.update()
    expect(wrapper.find(Card).length).toBe(0)
    expect(wrapper.find(Alert).hasClass('error'))
    expect(wrapper.find(Alert).text()).toBe('There is an error in loading cards')
    done()
  })
})
