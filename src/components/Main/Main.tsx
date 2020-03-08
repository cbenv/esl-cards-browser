/* Imports */

import React from 'react'

import './Main.css'

/* Component */

const Main: React.FC = ({ children }) => {
  return (
    <main className="main">
      {children}
    </main>
  )
}

/* Exports */

export default Main
