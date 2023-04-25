//helper function to select appointment for particular day
function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDays = state.days.filter(d => d.name === day);
  if (filteredDays.length === 0) {
    return result;
  }
  for (const key in state.appointments) {
    if (filteredDays[0]["appointments"].includes(Number(key))) {
      result.push(state["appointments"][key]);
    }
  }
  return result;
}

//helper function to select appointment for particular interview
function getInterview(state, interview) {
  if(!interview){
    return null
  } 
 return {
    student: interview.student,
    interviewer: state['interviewers'][interview.interviewer],
  }}

export {getAppointmentsForDay, getInterview};