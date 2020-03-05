/* Imports */

import qs from 'querystring';
import React, { useCallback, useEffect, useState } from 'react';

import { Alert, Card, Grid, Header, InfiniteScroll, LoadingSpinner, Main, SearchInput } from '..';
import { CardData, GetCardsListResponse } from '../../interfaces';

/* Setups */

const API_URL = 'https://api.elderscrollslegends.io';
const API_VERSION = 'v1';
const PAGINATION_SIZE = 20;

/* Component */

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  // TODO: [nice-to-have] preset nameFilter from url path, for easy bookmarking
  const [nameFilter, setNameFilter] = useState(''); 
  const [hasError, setHasError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const loadCards = useCallback(() => {
    const queryParams = qs.stringify({
      name: nameFilter,
      page: pageNumber,
      pageSize: PAGINATION_SIZE
    });
    const url = `${API_URL}/${API_VERSION}/cards?${queryParams}`;
    
    setIsLoading(true);
    setHasMore(false);
    setHasError(false);
    fetch(url)
      .then(response => {
        return response.ok
          ? response.json()
          : response.json().then(error => Promise.reject(error));
      })
      .then((data: GetCardsListResponse) => {
        const numberOfFetchedCards = pageNumber * PAGINATION_SIZE;
        setCards([...cards, ...data.cards]); // append cards to existing collection
        setHasMore(data._totalCount > numberOfFetchedCards);
      })
      .catch(error => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cards, nameFilter, pageNumber]);

  const onSearch = (nameFilter: string) => {
    setCards([]);
    setPageNumber(1);
    setNameFilter(nameFilter);
  };

  /**
   * when either page number of name filter changes, fetch cards
   */
  useEffect(loadCards, [pageNumber, nameFilter]);

  /**
   * when (1) there are more cards yet to be fetched, (2) page is scrolled to the bottom,
   * and (3) we are not currently fetching cards, then we increment the page number
   */
  useEffect(() => {
    if (!hasMore) return;
    if (!isAtBottom) return;
    if (isLoading) return;
    
    setPageNumber(pageNumber + 1);
    setIsAtBottom(false);
  }, [hasMore, isAtBottom, isLoading, pageNumber]);

  return (
    <div>
      <Header>Elder Scrolls Legends Cards</Header>
      <Main>
        <InfiniteScroll onIsAtBottomChange={setIsAtBottom}>
          <SearchInput defaultSearchText={nameFilter} inputPlaceholder="Search by name" onSearch={onSearch} />
          {/* TODO: [nice-to-have] support more filters */}
          <Grid>
            {cards.map(card => <Card data={card} key={card.id} />)}
          </Grid>
          {isLoading && <LoadingSpinner />}
          {hasError && <Alert level="error">There is an error in loading cards</Alert>}
          {!hasError && !hasMore && !isLoading && <Alert level="info">You have reached the end of the results</Alert>}
        </InfiniteScroll>
      </Main>
    </div>
  );
}

/* Exports */

export default App;
