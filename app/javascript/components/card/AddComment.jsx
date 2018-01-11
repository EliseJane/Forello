import React from 'react';

const Comments = () => {
  return (
    <li className="comment-section">
      <h2 className="comment-icon icon">Add Comment</h2>
      <div>
        <div className="member-container">
          <div className="card-member"></div>
        </div>
        <div className="comment">
          <label>
            <textarea required="" rows="1" placeholder="Write a comment..."></textarea>
            <div>
              <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
              <a className="light-button attachment-icon sm-icon"></a>
            </div>
            <div>
              <input type="submit" className="button not-implemented" value="Save" />
            </div>
          </label>
        </div>
      </div>
    </li>
  );
};

export default Comments;
