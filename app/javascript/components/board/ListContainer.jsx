import React from 'react';
import PropTypes from 'prop-types';

import List from './List';

import * as actions from '../../actions/BoardActions';

class ListContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  state = {
    title: this.props.list.title
  };

  allTheseCards = () => {
    const store = this.context.store;
    const cards = store.getState().cards;
    return cards.filter(card => card.list_id === this.props.list.id);
  }

  render() {
    return (
      <div className="list-wrapper">
          <List cards={this.allTheseCards()} title={this.state.title} id={this.props.list.id} />
      </div>
    )
  }
}

export default ListContainer;
