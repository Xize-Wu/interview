import React, { Fragment, useState } from "react";
import { useVisualMode } from "hooks/useVisualMode";

import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import './styles.scss';

export default function Appointment(props) {
  const { id, bookInterview } = props;

  //use custom hook to change component rendered in application
  const EMPTY = "EMPTY"; 
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save interviewer and name 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then(
      () =>{transition(SHOW)}
    )
  }
  
  console.log(props)
  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview? props.interview.student :"Hello!"}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === SAVING && <Status message={"Saving"} />}

        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}

      </article>
    </Fragment>

  );
}