/* Imports */

import React from 'react';

import './Header.css';

/* Component */

const Header: React.FC = props => {
  return (
    <header className="header">
      {props.children}
    </header>
  );
}

/* Exports */

export default Header;
