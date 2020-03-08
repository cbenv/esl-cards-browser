/* Imports */

import React from 'react'

import './Header.css'

/* Component */

const Header: React.FC = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  )
}

/* Exports */

export default Header
