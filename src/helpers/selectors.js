export function getAppointmentsForDay(state, day) {
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