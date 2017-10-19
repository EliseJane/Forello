import React from 'react';
import PropTypes from 'prop-types';

import CardTile from './CardTile';

import * as actions from '../../actions/BoardActions';

const List = (props) => {
  const cardComponents = props.cards.map(card => <CardTile card={card} key={card.id} />);

  return (
    <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
              <p className="list-title">{props.title}</p>
          </div>
          <div className="add-dropdown add-top">
              <div className="card"></div><a className="button">Add</a><i className="x-icon icon"></i>
              <div className="add-options"><span>...</span>
              </div>
          </div>

          <div id="cards-container" data-id={`list-${props.id}-cards`}>
            {cardComponents}
          </div>

          <div className="add-dropdown add-bottom">
              <div className="card"><div className="card-info"></div><textarea name="add-card"></textarea><div className="members"></div></div>
              <a className="button">Add</a><i className="x-icon icon"></i>
              <div className="add-options"><span>...</span></div>
          </div>
          <div className="add-card-toggle" data-position="bottom">Add a card...</div>
        </div>
    </div>

  );
};

export default List;
