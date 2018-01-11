import React from 'react';

import Label from './Label';

const Labels = (props) => {
  let labelDivs = null;
  if (props.labels.length > 0) {
    labelDivs = props.labels.map((label, index) =>
      <Label key={index} color={label} />
    );
  }
  return (
    <li className="labels-section">
      <h3>Labels</h3>
      {labelDivs}
      <div className="member-container"><i className="plus-icon sm-icon"></i>
      </div>
    </li>
  );
};

export default Labels
