import React from 'react';

const CreateCardTileForm = (props) => {
  return (
    <div className={props.classes}>
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" value={props.title} onChange={props.onChange}></textarea>
          <div className="members"></div>
        </div>
        <a onClick={props.onSave} className="button">Add</a>
        <i onClick={props.closeAddCardForm} className="x-icon icon"></i>
        <div className="add-options"><span>...</span></div>
    </div>
  );
}

export default CreateCardTileForm;
