import React from 'react'

const Label = (props) => {
  return (
    <div className="member-container">
      <div className={`${props.color} label colorblindable`}></div>
    </div>
  );
};

export default Label;
