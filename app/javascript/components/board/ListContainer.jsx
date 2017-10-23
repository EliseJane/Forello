import React from 'react';
import PropTypes from 'prop-types';

import List from './List';

import * as actions from '../../actions/ListActions';

class ListContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  state = {
    title: this.props.list.title,
    editing: false
  };

  allTheseCards = () => {
    const store = this.context.store;
    const cards = store.getState().cards;
    return cards.filter(card => card.list_id === this.props.list.id);
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

  render() {
    return (
      <div className="list-wrapper" data-index={this.props.idx}>
        <List
          cards={this.allTheseCards()}
          title={this.state.title}
          id={this.props.list.id}
          editing={this.state.editing}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ListContainer;
