import React from "react";
import classNames from "classnames";
import './InterviewerListItem.scss';

export default function InterviewListItem(props) {
  const listClass = classNames("interviewers__item",{
   "interviewers__item--selected": props.selected 
  }) 
  return (
    <li className={listClass} onClick={props.selectCurrentInterviewerID}>
      
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
    {props.selected && props.name}
    </li>

  );
}