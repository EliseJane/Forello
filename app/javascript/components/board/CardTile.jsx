import React from 'react';
import { Link } from 'react-router-dom';

const CardTile = (props) => {
  const labelsHTML = props.card.labels.map((label, index) => (
    <div key={index} className={`card-label ${label} colorblindable`}></div>
    )
  )

  const cardIconsHTML = () => {
    const hasDueDate = props.card.due_date ? <i className="clock-icon sm-icon overdue-recent completed">{props.card.due_date}</i> : ""
    const hasDescription = props.card.description ? <i className="description-icon sm-icon"></i> : ""
    const hasComments = props.card.comments_count > 0 ? <i className="comment-icon sm-icon"></i> : ""

    return (
      <div className="card-icons">
        {hasDueDate}
        {hasDescription}
        {hasComments}
      </div>
    )
  }

  if (props.card.archived) {
    return null;
  } else {
    return (
      <Link to={`/cards/${props.card.id}`} data-index={props.idx}>
        <div className="card-background">
          <div className="card "><i className="edit-toggle edit-icon sm-icon"></i>
              <div className="card-info">
                {labelsHTML}
                <p>{props.card.title}</p>
              </div>
              {cardIconsHTML()}
          </div>
        </div>
      </Link>
    );
  }
};

export default CardTile;
