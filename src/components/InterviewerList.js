import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 
import './InterviewerList.scss';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props
  const interviewerItems = interviewers.map(
    (interviewer) =>{
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