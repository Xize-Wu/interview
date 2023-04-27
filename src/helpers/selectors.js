//helper function to select appointment for particular day
function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDays = state.days.filter(d => d.name === day);
  if (filteredDays.length === 0) {
    return result;
  }
  // appointments
  const result2 = [];
  for (const key of filteredDays[0].appointments) {
    const app = Object.values(state.appointments);
    const a = app.filter(appointment => {
      if (appointment.id === key){
        return true
      }
    })
    result2.push(a[0])
    // result2.push(state.appointments[key - 1]);
  }

  // for (const key in state.appointments) {
  //   if (filteredDays[0]["appointments"].includes(Number(key))) {
  //     result.push(state["appointments"][key]);
  //   }
  // }

  return result2;
}

//helper function to select appointment for particular interview
function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state['interviewers'][interview.interviewer],
  };
}

//helper function to select interviewer for particular day
function getInterviewersForDay(state, day) {
  // {
  // day: 'Monday'
  // appointments: {...}
  // interviewers: {{
  //   1: {avatar, id:  name: ''}|
  //   2: {}
  //   3: {}
  // }}
  // days: [
  //   {
  //     id:1,
  //     name: 'Monday',
  //     appointments: [1,2,3,4,5],
  //     interviewers: [1,4,6,9,10] 
  //   }
  // ]
  // }
  const result = [];
  const filteredDays = state.days.filter(d => d.name === day);
  if (filteredDays.length === 0) {
    return result;
  }
  const foundDay = filteredDays[0];
  const currentInterviewersArray = foundDay.interviewers; // [1,6,7,8]
  if(!currentInterviewersArray){
    return result;
  }
  console.log("state.interviewers", state.interviewers)
  const currentInterviewers = currentInterviewersArray.map(id => {
    const interviewsArr = Object.values(state.interviewers)
    const interviewer = interviewsArr.filter(int => {
      if (int.id === id){
        return true
      }
    })
    return interviewer[0];
  });


  return currentInterviewers;

  // for (const key in state.appointments) {
  //   if (filteredDays[0]["appointments"].includes(Number(key)) && state["appointments"][key]["interview"]) {
  //     const temp = state["appointments"][key]["interview"]["interviewer"]
  //    result.push(state["interviewers"][temp])
  //   }
  // }
  // return (result)
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };