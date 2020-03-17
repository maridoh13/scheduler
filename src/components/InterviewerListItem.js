import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const {id, name, avatar, setInterviewer} = props

  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  })
 
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        id={ id }
        className="interviewers__item-image"
        src={ avatar }
        alt={ name }
      />
      { props.selected && name } 
    </li>
  );
};