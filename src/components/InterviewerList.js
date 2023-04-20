import React from "react";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";
import './InterviewerList.scss';

export default function InterviewerList(props) {
  const {interviewers, selectCurrentInterviewerID} = props
  const selected = props.interviewer

  const interviewerItems = interviewers.map(
    (interviewer) =>{
      return <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selectCurrentInterviewerID={selectCurrentInterviewerID}
      interviewer={selected}
      />
    }
  )
  
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light"></h4>
  <ul className="interviewers__list">{interviewerItems}</ul>
</section>
  );
}

{/* <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
</section> */}