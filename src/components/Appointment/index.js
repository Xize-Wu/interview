import React, { Fragment, useState } from "react";
import { useVisualMode } from "hooks/useVisualMode";

import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import './styles.scss';

export default function Appointment(props) {
  const { id, bookInterview, deleteInterview } = props;

  //use custom hook to change component rendered in application
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETING = "DELETING"
  const EDITING = "EDITING"
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save interviewer and name 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(
        () => { transition(SHOW); }
      )
      .catch(
        () => { transition(ERROR_SAVE, true); }
      );
  }

  //transit to the confirm window
  function confirm (){
    transition(CONFIRM)
  }

  //cancel a interview
  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true)
    deleteInterview(id, interview)
      .then(
        () => (transition(EMPTY))
      )
      .catch(
        () => { transition(ERROR_DELETE, true); }
      );
  }
console.log(props.interview)
  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview ? props.interview.student : "Hello!"}
            interviewer={props.interview.interviewer}
            onDelete={confirm}
            onEdit={() => transition(EDITING)}
          />
        )}
        {mode === CONFIRM && <Confirm
          onConfirm={() => cancel()}
          onCancel={() => back()} />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === ERROR_SAVE && <Error
          message={"Could not save appointment."}
          onClose={back} />}
        {mode === ERROR_DELETE && <Error
          message={"Could not delete appointment."}
          onClose={back} />}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === EDITING && (
          <Form
            interviewers={props.interviewers}
            interviewer = {props?.interview?.interviewer?.id}
            student = {props?.interview?.student}
            onSave={save}
            onCancel={back}
          />
        )}


      </article>
    </Fragment>

  );
}