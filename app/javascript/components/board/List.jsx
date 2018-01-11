import React from 'react';

import CardTile from './CardTile';
import CreateCardTileContainer from './CreateCardTileContainer';

const List = (props) => {
  const cardComponents = props.cards.map((card, index) =>
      <CardTile card={card} key={card.id} idx={index}/>);

  let renderTitle;
    if (props.editing) {
      renderTitle = (
        <input
          className="list-title edit-title"
          value={props.title}
          autoFocus={true}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />);
    } else {
      renderTitle = (<p className="list-title">{props.title}</p>);
    }

  return (
    <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div onClick={props.onClick}>
              {renderTitle}
          </div>
          <div className="add-dropdown add-top">
              <div className="card"></div>
              <a className="button">Add</a><i className="x-icon icon"></i>
              <div className="add-options"><span>...</span></div>
          </div>

          <div id="cards-container" data-id={`list-${props.id}-cards`}>
            {cardComponents}
          </div>
          <CreateCardTileContainer
            listId={props.id}
            position={props.newPosition}
            listAddingCard={props.listAddingCard}
            changeListAddingCard={props.changeListAddingCard}
          />
        </div>
    </div>
  );
}

export default List;
