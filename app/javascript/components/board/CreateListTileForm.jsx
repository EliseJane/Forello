import React from 'react';
import PropTypes from 'prop-types';

const CreateListTileForm = props => {
  const isSelected = props.showForm ? 'selected' : '';

  return (
    <div id="new-list" className={`new-list ${isSelected}`}>
      <span onClick={props.openForm}>Add a list...</span>
      <input onChange={props.onChange} type="text" value={props.title} placeholder="Add a list..." />
      <div>
          <input
            onClick={props.onSave}
            type="submit"
            className="button"
            value="Save"
            disabled={props.title === ''}
          />
          <i onClick={props.closeForm} className="x-icon icon"></i>
      </div>
    </div>
  );
}

export default CreateListTileForm;
