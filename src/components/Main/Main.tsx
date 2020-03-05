/* Imports */

import React from 'react';

import './Main.css';

/* Component */

const Main: React.FC = props => {
  return (
    <main className="main">
      {props.children}
    </main>
  );
}

/* Exports */

export default Main;
