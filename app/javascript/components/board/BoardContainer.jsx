import React from 'react';
import PropTypes from 'prop-types';

import Board from './Board';

import * as actions from '../../actions/BoardActions';
import * as listActions from '../../actions/ListActions';
import PositionCalculator from '../../lib/PositionCalculator';

import Dragula from 'react-dragula';

class BoardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    listAddingCard: null
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchBoard(this.props.match.params.id));

    Dragula([document.querySelector('#existing-lists')], {
      direction: 'horizontal',
      revertOnSpill: true
    }).on('drop', this.updateListPosition);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateListPosition = (el, target, source, sibling) => {
    const lists = this.allLists();
    const oldIndex = +el.dataset.index;
    let newIndex;

    if (sibling) {
      newIndex = +sibling.dataset.index - 1;
    } else {
      newIndex = lists.length - 1;
    }

    const newPosition = PositionCalculator(lists, newIndex, oldIndex);
    const listId = +lists[oldIndex].id;
    this.context.store.dispatch(
      listActions.updateList({ position: newPosition, id: listId })
    );
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

  lastPosition = () => {
    const lists = this.allLists();
    if (lists[lists.length-1]) {
      return lists[lists.length-1].position;
    } else {
      return 0;
    }
  }

  changeListAddingCard = (id) => {
    this.setState({ listAddingCard: id });
  }

  render() {
    return (
      <Board
        lists={this.allLists()}
        title={this.currentBoardTitle()}
        id={+this.props.match.params.id}
        newPosition={this.lastPosition()+100}
        listAddingCard={this.state.listAddingCard}
        changeListAddingCard={this.changeListAddingCard}
      />
    )
  }
}

export default BoardContainer;
