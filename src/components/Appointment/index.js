import React, { Fragment, useState } from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import './styles.scss';

export default function Appointment(props) {
  const {interview} = props
  return (
    <Fragment>
      <Header time = {props.time}/>
          <article className="appointment">
      {interview ? <Show 
      student = {interview.student}
      interviewer = {interview.interviewer}/> : <Empty />}
    </article>
    </Fragment>

  );
}