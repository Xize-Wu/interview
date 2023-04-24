import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import './InterviewerList.scss';

export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props

  const interviewerItems = interviewers.map(
    (interviewer) =>{
      console.log("Selected:", interviewer.id, value)
      return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}    

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