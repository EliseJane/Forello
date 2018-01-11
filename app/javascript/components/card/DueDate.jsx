import React from 'react';

const DueDate = (props) => {
  if (!props.card.due_date) { return null; }

  const overdue = () => {
    const dueDate = props.card.due_date;
    const dueDateParts = dueDate.split("-").map(part => +part);

    const today = new Date();
    const todayParts = [today.getFullYear(), today.getMonth(), today.getDate()];

    for (var i = 0; i < dueDateParts.length; i++) {
      if (dueDateParts[i] < todayParts[i]) {
        return true;
      }
    }
    return false;
  }

  const completedChecked = () => {
    if (props.card.completed) {
      return "checked";
    } else {
      return null;
    }
  }

  let classes = '';
  let pastDue = '';

  if (overdue()) {
    classes = classes.concat('overdue ');
    pastDue = " (past due)";
  }
  if (completedChecked()) {
    classes = classes.concat('completed');
  }

  return (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div id="dueDateDisplay" className={classes}>
        <input
          id="dueDateCheckbox"
          type="checkbox"
          className="checkbox"
          checked={completedChecked()}
        />
        {props.card.due_date}
        <span>{pastDue}</span>
      </div>
    </li>
  );
};

export default DueDate;
