import React from 'react';
import PropTypes from 'prop-types';

// import ListContainer from './ListContainer';
// import ToggleableCreateListTile from './ToggleableCreateListTile';

import * as actions from '../../actions/BoardActions';

class Board extends React.Component {
  state = {
    title: this.props.title
  }

  const lists = this.props.lists.map(list => (
    <ListContainer list={list} />
  ));

  render() {
    return (
      <div>
        <header>
          <ul>
            <li id="title">{this.state.title}</li>
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
                  { lists }
                </div>
                <ToggleableCreateListTile />
            </div>
        </main>
      </div>
    );
  }
}

export default Board;
