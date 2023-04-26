import React, { useState, useEffect } from "react";
import DayList from "./DayList.js";
import Axios from "axios";

import { getAppointmentsForDay, getInterview } from "helpers/selectors.js";
import Appointment from "./Appointment/index.js";
import { useVisualMode } from "hooks/useVisualMode.js";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers:{}
  })

  const appointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then((all)=>{
        setState(prev => ({...prev, 
          days: Object.values(all[0]["data"]),
          appointments: Object.values(all[1]["data"]),
          interviewers:Object.values(all[2]["data"])}));
      })
      .catch(error => console.log(error));
  }, []);

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
            return <Appointment
              key = {appointment.id}
              id = {appointment.id}
              time = {appointment.time}
              interview = {interview}
            />
          }
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
