import React from 'react';
import PropTypes from 'prop-types';

// import ListContainer from './ListContainer';
// import ToggleableCreateListTile from './ToggleableCreateListTile';

import * as actions from '../../actions/BoardActions';

class Board extends React.Component {
  state = {
    title: this.props.title
  };

  render() {
    return (
      <main>
          <div id="list-container" className="list-container">
              <div id="existing-lists" className="existing-lists">

              </div>

          </div>
      </main>
    );
  }
}

export default Board;
