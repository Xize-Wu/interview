import Axios from "axios";
import { useState, useEffect } from "react";


const useApplication =() => {
  //define a stateful component with initial state values
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers:{}
  })
  
  const setDay = day => setState({ ...state, day });
    
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

  //use the appointment id to find the right appointment slot and set its interview data to null
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
  return {deleteInterview, bookInterview, state,setDay}
}

export default useApplication