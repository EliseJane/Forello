import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  let archiveOrUnarchive;
  let deleteButton = null;
  if (props.archived) {
    archiveOrUnarchive = (
      <li onClick={props.handleUnarchive} className="unarchive-button">
        <i className="send-icon sm-icon"></i>
        Send to board
      </li>
    );
    deleteButton = (
      <Link to={`/boards/${props.boardId}`}>
        <li onClick={props.handleDelete} className="red-button">
          <i className="minus-icon sm-icon"></i>
          Delete
        </li>
      </Link>
    );
  } else {
    archiveOrUnarchive = (
      <li
        onClick={props.handleArchive}
        className="archive-button"
      >
        <i className="file-icon sm-icon ">
        </i>Archive
      </li>
    );
  }

  return (
    <aside className="modal-buttons">
      <h2>Add</h2>
      <ul>
        <li className="member-button">
          <i className="person-icon sm-icon">
          </i>Members
        </li>
        <li className="label-button">
          <i className="label-icon sm-icon">
          </i>Labels
        </li>
        <li className="checklist-button">
          <i className="checklist-icon sm-icon">
          </i>Checklist
        </li>
        <li className="date-button not-implemented">
          <i className="clock-icon sm-icon">
          </i>Due Date
        </li>
        <li className="attachment-button not-implemented">
          <i className="attachment-icon sm-icon">
          </i>Attachment
        </li>
      </ul>
      <h2>Actions</h2>
      <ul>
        <li className="move-button">
          <i className="forward-icon sm-icon">
          </i>Move
        </li>
        <li className="copy-button">
          <i className="card-icon sm-icon">
          </i>Copy
        </li>
        <li className="subscribe-button">
          <i className="sub-icon sm-icon"></i>
          Subscribe
          <i className="check-icon sm-icon"></i>
        </li>
        <hr />
        {archiveOrUnarchive}
        {deleteButton}
      </ul>
      <ul className="light-list">
        <li className="not-implemented">Share and more...</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
