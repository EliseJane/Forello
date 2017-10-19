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

  allLists = () => {
    const store = this.context.store;
    return store.getState().lists;
  }

  currentBoardTitle = () => {
    const store = this.context.store;
    const id = +this.props.match.params.id;
    const boards = store.getState().boards;
    const board = boards.filter(board => +board.id === id)[0];
    return (board && board.title) || null;
  }

  render() {
    return (
      <Board lists={this.allLists()} title={this.currentBoardTitle()} />
    )
  }
}

export default BoardContainer;
