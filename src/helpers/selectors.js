
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

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  let interviewer = state.interviewers[interview.interviewer]
  return { ...interview, interviewer }
}

