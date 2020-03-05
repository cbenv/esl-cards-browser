/* Imports */

import React from 'react';

import { CardData } from '../../interfaces/CardData';
import { DataList } from '..';

import './Card.css';

/* Setups */

interface Props {
  data: CardData;
}

/* Component */

const Card: React.FC<Props> = ({ data }) => {
  const cardInfo = {
    'Set Name': data.set && data.set.name,
    'Type': data.type,
    'Subtypes': data.subtypes && data.subtypes.join(', '),
    'Attributes': data.attributes && data.attributes.join(', '),
    'Cost': data.cost ? `${data.cost}` : undefined,
    'Health': data.health ? `${data.health}` : undefined,
    'Power': data.power ? `${data.power}` : undefined,
    'Rarity': data.rarity,
    'Unique': data.unique ? 'Yes' : 'No',
    'Text': data.text, // TODO: [nice-to-have] bold keywords in text
  };

  return (
    <div className="card">
      {/* TODO: [nice-to-have] build Image component that can show loading indicator when the asset is being fetched */}
      <img alt={data.name} className="card__image" src={data.imageUrl} />
      <div className="card__info">
        <h2 className="card__name">{data.name}</h2>
        <DataList data={cardInfo} />
      </div>
    </div>
  );
}

/* Exports */

export default Card;
