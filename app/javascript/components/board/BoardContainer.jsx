import React from 'react';
import PropTypes from 'prop-types';

import Board from './Board';

import * as actions from '../../actions/BoardActions';

class BoardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchBoard(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
// this is where we left off
  allLists = () => {
    const store = this.context.store;
    return store.getState().lists;
  }

  render() {
    return (
      <div>
        <Board lists={this.allLists()} title= />
      </div>
    )
  }
}

export default BoardContainer;
