import React from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../actions/CardActions';

class Header extends React.Component {
  state = {
    title: this.props.card.title
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleBlur = () => {
    if (!this.props.card.archived) {
      const editedCard = {
        title: this.state.title,
        id: this.props.card.id
      };

      this.context.store.dispatch(actions.updateCard(editedCard));
    }
  };

  handleChange = (e) => {
    if (!this.props.card.archived) {
      this.setState({ title: e.target.value });
    }
  };

  render() {
    return (
      <header>
        <i className="card-icon icon .close-modal"></i>
        <textarea
          className="list-title"
          style={{height: '45px'}}
          value={this.state.title}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        >
        </textarea>
        <p>in list
          <a className="link"> {this.props.listTitle}</a>
          <i className="sub-icon sm-icon"></i>
        </p>
      </header>
    );
  }
};

export default Header;
