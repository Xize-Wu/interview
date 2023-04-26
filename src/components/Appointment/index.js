import React, { Fragment, useState } from "react";
import { useVisualMode } from "hooks/useVisualMode";

import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import './styles.scss';

export default function Appointment(props) {
  const { interview } = props;

  //use custom hook to change component rendered in application
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}

        {mode === CREATE && (
          <Form
            interviewers={[]}
            onSave={() => {console.log("Clicked onSave")}}
            onCancel={() => back()}
          />
        )}

      </article>
    </Fragment>

  );
}