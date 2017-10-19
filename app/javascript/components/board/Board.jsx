import React from 'react';
import PropTypes from 'prop-types';

import ListContainer from './ListContainer';
// import ToggleableCreateListTile from './ToggleableCreateListTile';

import * as actions from '../../actions/BoardActions';

const Board = (props) => {
  const lists = props.lists.map(list => <ListContainer list={list} key={list.id} />);

  return (
    <main>
        <div id="list-container" className="list-container">
            <div id="existing-lists" className="existing-lists">
              {lists}
            </div>
            {/*<ToggleableCreateListTile />*/}
        </div>
    </main>
  );
}

export default Board;
