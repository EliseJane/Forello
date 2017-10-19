import React from 'react';
import PropTypes from 'prop-types';

import List from './List';

import * as actions from '../../actions/BoardActions';

class ListContainer extends React.Component {
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
          <div className="list-background">
              <div className="list">
                <a className="more-icon sm-icon" href=""></a>
                <div>
                    <p className="list-title">{this.state.title}</p>
                </div>
                <div className="add-dropdown add-top">
                    <div className="card"></div><a className="button">Add</a><i className="x-icon icon"></i>
                    <div className="add-options"><span>...</span>
                    </div>
                </div>
                  <List cards={this.allTheseCards()} id={this.props.list.id} />
                <div className="add-dropdown add-bottom">
                    <div className="card"><div className="card-info"></div><textarea name="add-card"></textarea><div className="members"></div></div>
                    <a className="button">Add</a><i className="x-icon icon"></i>
                    <div className="add-options"><span>...</span></div>
                </div>
                <div className="add-card-toggle" data-position="bottom">Add a card...</div>
              </div>
          </div>
      </div>
    )
  }
}

export default ListContainer;
