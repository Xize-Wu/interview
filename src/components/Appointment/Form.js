import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const [name, setName] = useState(props.student||'');
  const [interviewer, setInterviewer] = useState(props.interviewer||null);
  const [error, setError] = useState("")

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleInterviewerChange = (event) => {
    setInterviewer(event)
  };  

  const reset = () =>{
    setName("");
    setError("")
    setInterviewer(null)
  }
  
  const validate = () =>{
    if(name === ""){
      setError("Student name cannot be blank.")
    } else {
      setError("")
      props.onSave(name, interviewer)
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleNameChange}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
             interviewers={props.interviewers}
             value={interviewer}
             onChange={handleInterviewerChange}
   
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick = {reset}>Cancel</Button>
          <Button confirm onClick = {() =>validate()}>Save</Button>
        </section>
      </section>
    </main>

  );
}