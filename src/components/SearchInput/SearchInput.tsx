/* Imports */

import noop from 'lodash/noop'
import React, { useCallback, useState } from 'react'

import './SearchInput.css'

/* Setups */

export interface Props {
  resetButtonText?: string
  searchButtonText?: string
  searchPlaceholder?: string
  searchText?: string
  onSearch?: (input: string) => void
}

/* Component */

const SearchInput: React.FC<Props> = (props) => {
  const {
    resetButtonText = 'Reset',
    searchButtonText = 'Search',
    searchPlaceholder = 'Search...',
    searchText: defaultSearchText = '',
    onSearch = noop,
  } = props

  const [searchText, setSearchText] = useState(defaultSearchText)

  const onSearchTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }, [])

  const onResetButtonClick = useCallback(() => {
    // only do something if the passed-down search text is not already empty
    if (defaultSearchText !== '') {
      setSearchText('')
      onSearch('')
    }
  }, [defaultSearchText, onSearch])

  const onSearchButtonClick = useCallback(() => {
    // only do something if the passed-down search text is different from the search text typed in the input element
    if (defaultSearchText !== searchText) {
      onSearch(searchText)
    }
  }, [defaultSearchText, searchText, onSearch])

  const onFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // prevent browser navigation
    onSearchButtonClick()
  }, [onSearchButtonClick])

  return (
    <form className="search-input" onSubmit={onFormSubmit}>
      <input className="search-input__input" onChange={onSearchTextChange} placeholder={searchPlaceholder} type="text" value={searchText} />
      <div className="search-input__action-buttons">
        <button className="search-input__reset-button" onClick={onResetButtonClick} type="button">{resetButtonText}</button>
        <button className="search-input__search-button" onClick={onSearchButtonClick} type="submit">{searchButtonText}</button>
      </div>
    </form>
  )
}

/* Exports */

export default SearchInput
