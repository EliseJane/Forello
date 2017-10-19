import React from 'react';
import PropTypes from 'prop-types';

import CardTile from './CardTile';

import * as actions from '../../actions/BoardActions';

const List = (props) => {
  const cardComponents = props.cards.map(card => <CardTile card={card} key={card.id} />);

  return (
    <div id="cards-container" data-id={`list-${props.id}-cards`}>
      {cardComponents}
    </div>
  );
};

export default List;
