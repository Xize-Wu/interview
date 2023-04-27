import React, { useState, useEffect } from "react";
import DayList from "./DayList.js";
import Axios from "axios";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import Appointment from "./Appointment/index.js";
import "components/Application.scss";

export default function Application(props) {

  //define a stateful component with initial state values
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers:{}
  })
  
  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  
  //fetch data from API endpoints and update component state
  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then((all)=>{
        setState(prev => ({...prev, 
          days: all[0]["data"],
          appointments: all[1]["data"],
          interviewers:all[2]["data"]}));
      })
      .catch(error => console.log(error));
  }, []);

  //change the local state when we book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };    
    const appointments = {...state.appointments, [id]: appointment}
    return Axios
    .put(`/api/appointments/${id}`, {interview})
    .then(()=>{
      setState(prev =>({...prev, appointments}))
    })
  }

  //use the appointment id to find the right appointment slot and set it's interview data to null
  function deleteInterview(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {...state.appointments, [id]: appointment}
    return Axios
    .delete(`/api/appointments/${id}`, {interview})
    .then(()=>{
      setState(prev =>({...prev, appointments}))
    })
  }
  
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
