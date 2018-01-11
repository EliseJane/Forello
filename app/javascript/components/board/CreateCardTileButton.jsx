import React from 'react';

const CreateCardTileButton = (props) => {
  return (
    <div onClick={props.openAddCardForm} className="add-card-toggle" data-position="bottom">
      Add a card...
    </div>
  );
}

export default CreateCardTileButton;
