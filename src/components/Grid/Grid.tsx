/* Imports */

import React from 'react';

import './Grid.css';

/* Component */

const Grid: React.FC = ({ children }) => {
  return (
    <div className="grid">
      {children}
    </div>
  );
}

/* Exports */

export default Grid;
