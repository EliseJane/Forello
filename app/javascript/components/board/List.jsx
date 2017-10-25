import React from 'react';
import PropTypes from 'prop-types';

import CardTile from './CardTile';
import CreateCardTileContainer from './CreateCardTileContainer';

import * as actions from '../../actions/BoardActions';

class List extends React.Component {
  componentDidMount() {
    Dragula([document.querySelector('#cards-container')], {
      direction: 'vertical',
      revertOnSpill: true
    }).on('drop', this.updateCardPosition);
  }

  updateCardPosition = (el, target, source, sibling) => {
    const cards = this.props.allCards();
    const oldIndex = +el.dataset.index;
    console.log(cards);
    console.log(el)
    // let newIndex;
    //
    // if (sibling) {
    //   newIndex = +sibling.dataset.index - 1;
    // } else {
    //   newIndex = lists.length - 1;
    // }
    //
    // const newPosition = PositionCalculator(lists, newIndex, oldIndex);
    // const listId = +lists[oldIndex].id;
    // this.context.store.dispatch(
    //   listActions.updateList({ position: newPosition, id: listId })
    // );
  }

  cardComponents = () => {
    this.props.cards.map(card => <CardTile card={card} key={card.id} />);
  }

  renderTitle = () => {
    if (this.props.editing) {
      return (
        <input
          className="list-title edit-title"
          value={this.props.title}
          autoFocus={true}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
        );
    } else {
      return (<p className="list-title">{this.props.title}</p>);
    }
  }

  render() {
    return (
      <div className="list-background">
          <div className="list">
            <a className="more-icon sm-icon" href=""></a>
            <div onClick={this.props.onClick}>
                {this.renderTitle()}
            </div>
            <div className="add-dropdown add-top">
                <div className="card"></div>
                <a className="button">Add</a><i className="x-icon icon"></i>
                <div className="add-options"><span>...</span></div>
            </div>

            <div id="cards-container" data-id={`list-${this.props.id}-cards`}>
              {cardComponents}
            </div>
            <CreateCardTileContainer
              listId={this.props.id}
              position={this.props.newPosition}
              listAddingCard={this.props.listAddingCard}
              changeListAddingCard={this.props.changeListAddingCard}
            />
          </div>
      </div>
    );
  }
}

export default List;
