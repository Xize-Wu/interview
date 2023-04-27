import React from "react";
import DayList from "./DayList.js";
import useApplication from "hooks/useApplication.js";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import Appointment from "./Appointment/index.js";
import "components/Application.scss";

export default function Application(props) {
  const {deleteInterview, bookInterview, state,setDay}=useApplication()
  const appointments = getAppointmentsForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointments.map(
          appointment =>{
            const interview = getInterview(state, appointment.interview);
            const interviewers = getInterviewersForDay(state, state.day)
            return <Appointment
              key = {appointment.id}
              id = {appointment.id}
              time = {appointment.time}
              interview = {interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              deleteInterview={deleteInterview}
            />
          }
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
