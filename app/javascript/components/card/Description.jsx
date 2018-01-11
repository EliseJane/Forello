import React from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../actions/CardActions';

class Description extends React.Component {
  state = {
    description: this.props.card.description,
    formOpen: false
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => { this.forceUpdate(); });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleEditClick = () => {
    this.setState({ formOpen: true });
  };

  handleXClick = () => {
    this.setState({ formOpen: false });
  };

  handleSave = () => {
    const editedCard = {
      id: this.props.card.id,
      description: this.state.description
    }
    this.context.store.dispatch(actions.updateCard(editedCard, () => {
      this.handleXClick()
    }));
  };

  render () {
    if (this.state.formOpen) {
      return (
        <form className="description">
          <p>Description</p>
          <textarea
            className="textarea-toggle"
            rows="1"
            autoFocus
            value={this.state.description}
            onChange={this.handleChange}
          ></textarea>
          <div>
            <div className="button" value="Save" onClick={this.handleSave}>Save</div>
            <i className="x-icon icon" onClick={this.handleXClick}></i>
          </div>
        </form>
      );
    } else {
      return (
        <form className="description">
          <p>Description</p>
          <span id="description-edit" className="link" onClick={this.handleEditClick}>Edit</span>
          <p className="textarea-overlay">{this.state.description}</p>
          <p id="description-edit-options" className="hidden">
            You have unsaved edits on this field.
            <span className="link">View edits</span> - <span className="link">Discard</span>
          </p>
        </form>
      );
    }
  }
};

export default Description;
