import React from 'react';

import Comment from './Comment';

const Activity = (props) => {
  let commentDivs = null;
  if (props.comments.length > 0) {
    commentDivs = props.comments.map((comment, index) =>
      <Comment key={index} thisComment={comment} />
    );
  }
  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">
        {commentDivs}
      </ul>
    </li>
  );
};

export default Activity;
