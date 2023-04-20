import React from "react";
import classNames from "classnames";
import './InterviewerListItem.scss';

export default function InterviewListItem(props) {
  const listClass = classNames("interviewers__item",{
   "interviewers__item--selected": props.interviewer === props.id, 
  }) 
  return (
    <li className={listClass} onClick={() => {props.selectCurrentInterviewerID(props.id)}}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.interviewer === props.id && props.name}
    </li>

  );
}