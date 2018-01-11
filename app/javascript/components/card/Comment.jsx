import React from 'react';

const Comment = (props) => {
  const comment = props.thisComment;
  const initials = comment.author.split(" ").map(name => name[0]).join("");
  return (
    <li>
      <div className="member-container">
        <div className="card-member">{initials}</div>
      </div>
      <h3>{comment.author}</h3>
      <div className="comment static-comment"><span>{comment.body}</span>
      </div>
      <small>{comment.created_at} - <span className="link">Edit</span> - <span className="link">Delete</span></small>
      <div className="comment">
        <label>
          <textarea required="" rows="1"></textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div>
          <div>
            <p>You haven't typed anything!</p>
            <input type="submit" className="button not-implemented" value="Save" /><i className="x-icon icon"></i>
          </div>
        </label>
      </div>
    </li>
  );
};

// <li>
//   <div className="member-container">
//     <div className="card-member small-size">EO</div>
//   </div>
//   <p><span className="member-name">Elise Olivares</span> changed the background of this board <small>yesterday at 4:53 PM</small>
//   </p>
// </li>
// <li className="activity-comment">
//   <div className="member-container">
//     <div className="card-member">EO</div>
//   </div>
//   <h3>Elise Olivares</h3>
//   <div className="comment static-comment"><span>Example of a comment.</span>
//   </div>
//   <small>22 minutes ago - <span className="link">Edit</span> - <span className="link">Delete</span></small>
//   <div className="comment">
//     <label>
//       <textarea required="" rows="1">Example of a comment.</textarea>
//       <div>
//         <a className="light-button card-icon sm-icon"></a>
//         <a className="light-button smiley-icon sm-icon"></a>
//         <a className="light-button email-icon sm-icon"></a>
//       </div>
//       <div>
//         <p>You haven't typed anything!</p>
//         <input type="submit" className="button not-implemented" value="Save" /><i className="x-icon icon"></i>
//       </div>
//     </label>
//   </div>
// </li>

export default Comment;
