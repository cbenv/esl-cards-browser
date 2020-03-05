/* Imports */

import noop from 'lodash/noop';
import React, { useCallback, useState } from 'react';

import './SearchInput.css';

/* Setups */

interface Props {
  defaultSearchText?: string;
  inputPlaceholder?: string;
  resetButtonText?: string;
  searchButtonText?: string;
  onSearch?: (input: string) => void;
}

/* Component */

const SearchInput: React.FC<Props> = props => {
  const {
    defaultSearchText = '',
    inputPlaceholder = 'Search...',
    resetButtonText = 'Reset',
    searchButtonText = 'Search',
    onSearch = noop
  } = props;

  const [searchText, setSearchText] = useState(defaultSearchText);

  const onSearchTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  const onResetButtonClick = useCallback(() => {
    if (defaultSearchText !== '') {
      setSearchText('');
      onSearch('');
    }
  }, [defaultSearchText, onSearch]);

  const onSearchButtonClick = useCallback(() => {
    if (defaultSearchText !== searchText) {
      onSearch(searchText);
    }
  }, [defaultSearchText, searchText, onSearch]);

  const onFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchButtonClick();
  }, [onSearchButtonClick]);

  return (
    <form className="search-input" onSubmit={onFormSubmit}>
      <input className="search-input__input" onChange={onSearchTextChange} placeholder={inputPlaceholder} type="text" value={searchText}></input>
      <div className="search-input__action-buttons">
        <button className="search-input__reset-button" onClick={onResetButtonClick}>{resetButtonText}</button>
        <button className="search-input__search-button" onClick={onSearchButtonClick}>{searchButtonText}</button>
      </div>
    </form>
  )
}

/* Exports */

export default SearchInput;
