import React from 'react';
import PropTypes from 'prop-types';

import List from './List';
import * as actions from '../../actions/ListActions';

class ListContainer extends React.Component {
  state = {
    title: this.props.list.title,
    editing: false
  };

  static contextTypes = {
    store: PropTypes.object
  };

  allTheseCards = () => {
    const cards = this.context.store.getState().cards;
    let theseCards = cards.filter(card => card.list_id === this.props.list.id);
    return theseCards.sort((a, b) => a.position - b.position);
  };

  handleClick = () => {
    this.setState({ editing: true });
  };

  handleBlur = () => {
    const editedList = {
      title: this.state.title,
      id: this.props.list.id
    };

    this.context.store.dispatch(
      actions.updateList(editedList, () => {
        this.setState({ editing: false });
      })
    );
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  listWrapperClasses = () => {
    let classes = "list-wrapper";
    if (this.props.listAddingCard === this.props.list.id) {
      classes += " add-dropdown-active";
    }
    return classes;
  }

  lastPosition = () => {
    const cards = this.allTheseCards();
    if (cards[cards.length-1]) {
      return cards[cards.length-1].position;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className={this.listWrapperClasses()} data-index={this.props.idx}>
        <List
          cards={this.allTheseCards()}
          title={this.state.title}
          id={this.props.list.id}
          editing={this.state.editing}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          listAddingCard={this.props.listAddingCard}
          changeListAddingCard={this.props.changeListAddingCard}
          newPosition={this.lastPosition()+100}
        />
      </div>
    )
  }
}

export default ListContainer;
