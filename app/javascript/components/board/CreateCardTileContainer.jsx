import React from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../actions/CardActions';

import CreateCardTileForm from './CreateCardTileForm';

class CreateCardTileContainer extends React.Component {
  state = {
    title: '',
  }

  static contextTypes = {
    store: PropTypes.object
  };

  openAddCardForm = () => {
    this.props.changeListAddingCard(this.props.listId);
  }

  closeAddCardForm = () => {
    this.props.changeListAddingCard(null);
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleSave = () => {
    const newCard = {
      title: this.state.title,
      list_id: this.props.listId,
      position: this.props.position
    };

    this.context.store.dispatch(
      actions.createCard(newCard, () => {
        this.setState({ title: '', active: false });
        this.props.changeListAddingCard(null);
      })
    );
  }

  render() {
    return (
      <CreateCardTileForm
        listAddingCard={this.props.listAddingCard}
        listId={this.props.listId}
        title={this.state.title}
        onSave={this.handleSave}
        openAddCardForm={this.openAddCardForm}
        closeAddCardForm={this.closeAddCardForm}
        onChange={this.handleChange}
      />
    );
  }
}

export default CreateCardTileContainer;
