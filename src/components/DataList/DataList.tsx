/* Imports */

import React from 'react';

import './DataList.css';

/* Setups */

interface Props {
  data: Record<string, string | undefined>;
}

/* Component */

const DataList: React.FC<Props> = ({ data }) => {
  return (
    <div className="data-list">
      {Object.entries(data).map(([key, value], index) => value && (
        <div className="data-list__entry" key={index}>
          <div className="data-list__key">{key}</div>
          <div className="data-list__value">{value}</div>
        </div>
      ))}
    </div>
  );
}

/* Exports */

export default DataList;
