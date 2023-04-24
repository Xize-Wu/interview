import React, { useState, useEffect } from "react";
import DayList from "./DayList.js";
import Axios from "axios";

import Appointment from "./Appointment/index.js";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Axios
      .get("/api/days")
      .then(response => {
        setState(prevState =>({
          ...prevState,
          days: response.data
        }))
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
        {Object.values(state.appointments).map(
          appointment =>{
            return <Appointment
              key = {appointment.id}
              id = {appointment.id}
              time = {appointment.time}
              interview = {appointment.interview}
            />
          }
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
