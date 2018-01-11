import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Labels from './Labels';
import DueDate from './DueDate';
import Description from './Description';
import AddComment from './AddComment';
import Activity from './Activity';
import Sidebar from './Sidebar';
import * as actions from '../../actions/CardActions';

class Card extends React.Component {
  state = {
    archived: this.props.card.archived
  }

  isArchived = () => {
    if (this.state.archived) {
      return (
        <div className="archived-banner">
          <i className="file-icon icon"></i>
          This card is archived.
        </div>
      );
    } else {
      return null;
    }
  }

  archiveCard = () => {
    this.setState({ archived: true });
    this.props.updateArchived(true);
  }

  unarchiveCard = () => {
    this.setState({ archived: false });
    this.props.updateArchived(false);
  }

  render() {
    return (
      <div id="modal">
        <Link to={`/boards/${this.props.card.board_id}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        {this.isArchived()}
        <Header card={this.props.card} listTitle={this.props.listTitle}/>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <Labels labels={this.props.card.labels} />
                <DueDate card={this.props.card} />
              </ul>
              <Description card={this.props.card} />
            </li>
            <AddComment />
            <Activity comments={this.props.card.comments} />
          </ul>
        </section>
        <Sidebar
          handleArchive={this.archiveCard}
          handleUnarchive={this.unarchiveCard}
          archived={this.state.archived}
          handleDelete={this.props.deleteCard}
          boardId={this.props.card.board_id}
        />
      </div>
    );
  }
}

export default Card;
