/* Imports */

import React from 'react'

import './Alert.css'

/* Setups */

interface Props {
  level: 'info' | 'warn' | 'error'
}

/* Component */

const Alert: React.FC<Props> = ({ children, level = 'error' }) => {
  return (
    <div className={`alert alert-${level}`}>
      {children}
    </div>
  )
}

/* Exports */

export default Alert
