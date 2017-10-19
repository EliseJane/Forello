import React from 'react';
import PropTypes from 'prop-types';

import Board from './Board';

import * as actions from '../../actions/BoardActions';

class BoardContainer extends React.Component {
  state = {
    title: null,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdateComponentAndState());
    store.dispatch(actions.fetchBoard(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  allLists = () => {
    const store = this.context.store;
    return store.getState().lists;
  }

  forceUpdateComponentAndState = () => {
    this.forceUpdate();
    this.setState({title: this.currentBoardTitle()});
  }

  currentBoardTitle = () => {
    const store = this.context.store;
    const id = +this.props.match.params.id;
    const boards = store.getState().boards;
    const board = boards.filter(board => +board.id === id)[0];
    return (board && board.title) || null;
  }

  render() {
    return (
      <div>
        <header>
          <ul>
            <li id="title">{this.currentBoardTitle()}</li>
            <li className="star-icon icon"></li>
            <li className="private private-icon icon">Private</li>
          </ul>
          <div className="menu">
            <i className="more-icon sm-icon"></i>Show Menu</div>
          <div className="subscribed">
            <i className="sub-icon sm-icon"></i>Subscribed</div>
        </header>
        <Board lists={this.allLists()} />
      </div>
    )
  }
}

export default BoardContainer;
