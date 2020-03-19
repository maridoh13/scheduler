
export default function getAppointmentsForDay(state, day) {
  const apptsForDay = []
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(apptID => {
        apptsForDay.push(state.appointments[apptID])
      })
    }
  })

  return apptsForDay;

}

