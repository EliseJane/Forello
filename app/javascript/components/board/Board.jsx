import React from 'react';
import PropTypes from 'prop-types';

import ListContainer from './ListContainer';
import CreateListTileContainer from './CreateListTileContainer';

import * as actions from '../../actions/BoardActions';

const Board = (props) => {
  const lists = props.lists.map(list => <ListContainer list={list} key={list.id} />);

  return (
    <div>
      <header>
        <ul>
          <li id="title">{props.title}</li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu</div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed</div>
      </header>
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            {lists}
          </div>
          <CreateListTileContainer
            id={props.id}
            position={props.lists.length + 1}
          />
        </div>
      </main>
    </div>
  );
}

export default Board;
