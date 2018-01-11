import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';

import Board from './Board';
import * as actions from '../../actions/BoardActions';
import { updateList } from '../../actions/ListActions';
import { updateCard } from '../../actions/CardActions';
import PositionCalculator from '../../lib/PositionCalculator';

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

    this.listDragger = Dragula([document.querySelector('#existing-lists')], {
      direction: 'horizontal',
      revertOnSpill: true,
      invalid: function(el) {
        return el.id === "cards-container";
      }
    }).on('drop', this.updateListPosition);

    this.cardDragger = Dragula({
      isContainer: function (el) {
        return el.id === 'cards-container';
      },
      direction: 'vertical',
    }).on('drop', this.updateListIdAndCardPosition);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  allCards = () => {
    return this.context.store.getState().cards;
  }
  getCards = (listId) => {
    const cards = this.allCards();
    return cards.filter(card => card.list_id === listId);
  }

  getListId = (list) => {
    return +list.dataset.id.replace('list-', '').replace('-cards', '');
  }

  getCardId = (card) => {
    return +card.href.slice(card.href.indexOf('/cards/')).replace('/cards/', '');
  }

  updateListIdAndCardPosition = (el, target, source, sibling) => {
    let oldIndex = +el.dataset.index;
    let listId = this.getListId(source);
    let cards = this.getCards(listId);
    const cardId = this.getCardId(el);
    let newIndex;

    if (target !== source) {
      listId = this.getListId(target);
      cards = this.getCards(listId);
      if (sibling) {
        newIndex = +sibling.dataset.index;
      } else {
        newIndex = cards.length;
      }
      oldIndex = -1;
    } else {
      if (sibling) {
        const siblingIndex = +sibling.dataset.index;
        if (siblingIndex > oldIndex) {
          newIndex = siblingIndex - 1;
        } else {
          newIndex = siblingIndex;
        }
      } else {
        newIndex = cards.length - 1;
      }
    }
    const newPosition = PositionCalculator(cards, newIndex, oldIndex);
    this.context.store.dispatch(
      updateCard({ position: newPosition, id: cardId, list_id: listId })
    );
  }

  updateListPosition = (el, target, source, sibling) => {
    this.listDragger.cancel();
    const lists = this.allLists();
    const oldIndex = +el.dataset.index;
    let newIndex;

    if (sibling) {
      const siblingIndex = +sibling.dataset.index;
      if (siblingIndex > oldIndex) {
        newIndex = siblingIndex - 1;
      } else {
        newIndex = siblingIndex;
      }
    } else {
      newIndex = lists.length - 1;
    }

    const newPosition = PositionCalculator(lists, newIndex, oldIndex);
    const listId = +lists[oldIndex].id;
    this.context.store.dispatch(
      updateList({ position: newPosition, id: listId })
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
