import React from 'react';
import PropTypes from 'prop-types';

const CreateCardTileForm = (props) => {
  const isListAddingCard = props.listId === props.listAddingCard;
  const classes = isListAddingCard ? 'active-card add-dropdown add-bottom' : 'add-dropdown add-bottom';

  return (
    <div>
    <div className={classes}>
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" value={props.title} onChange={props.onChange}></textarea>
          <div className="members"></div>
        </div>
        <a onClick={props.onSave} className="button">Add</a>
        <i onClick={props.closeAddCardForm} className="x-icon icon"></i>
        <div className="add-options"><span>...</span></div>
    </div>
    <div onClick={props.openAddCardForm} className="add-card-toggle" data-position="bottom">Add a card...</div>
    </div>
  );
}

export default CreateCardTileForm;
