import { CardData } from './CardData'

export interface GetCardsListResponse {
  cards: CardData[]
  _pageSize: number
  _totalCount: number
}
