/* Imports */

import React from 'react'
import { shallow } from 'enzyme'

import Card from './Card'
import { card1, card2 } from '../../../test/mocks/cards'
import DataList from '../DataList'

/* Tests */

test('renders image', () => {
  const wrapper = shallow(<Card data={card1} />)
  const image = wrapper.find('.card__image')

  expect(image.prop('src')).toBe(card1.imageUrl)
})

test('renders name', () => {
  const wrapper = shallow(<Card data={card1} />)
  const name = wrapper.find('.card__name')

  expect(name.text()).toBe(card1.name)
})

test('renders other attributes', () => {
  const wrapper = shallow(<Card data={card2} />)
  const dataList = wrapper.find(DataList)

  expect(dataList.prop('data')).toEqual({
    'Set Name': card2.set && card2.set.name,
    Type: card2.type,
    Subtypes: card2.subtypes && card2.subtypes.join(', '),
    Attributes: card2.attributes && card2.attributes.join(', '),
    Cost: card2.cost ? `${card2.cost}` : undefined,
    Health: card2.health ? `${card2.health}` : undefined,
    Power: card2.power ? `${card2.power}` : undefined,
    Rarity: card2.rarity,
    Unique: card2.unique ? 'Yes' : 'No',
    Text: card2.text,
  })
})
