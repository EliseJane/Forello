import React from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../actions/ListActions';

import CreateListTileForm from './CreateListTileForm';

class CreateListTileContainer extends React.Component {
  state = {
    showForm: false,
    title: '',
  }

  static contextTypes = {
    store: PropTypes.object
  };

  openForm = () => {
    this.setState({ showForm: true });
  }

  closeForm = () => {
    this.setState({ showForm: false });
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleSave = () => {
    const newList = {
      title: this.state.title,
      board_id: this.props.id,
      position: this.props.position
    };

    this.context.store.dispatch(
      actions.createList(newList, () => {
        this.setState({ title: '', showForm: false });
      })
    );
  }

  render() {
    return (
      <CreateListTileForm
        showForm={this.state.showForm}
        title={this.state.title}
        onSave={this.handleSave}
        openForm={this.openForm}
        closeForm={this.closeForm}
        onChange={this.handleChange}
      />
    );
  }
}

export default CreateListTileContainer;
