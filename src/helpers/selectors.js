export default function getAppointmentsForDay(state, day) {
  const apptsForDay = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(apptID => {
        apptsForDay.push(state.appointments[apptID])
      })
    }
  })

  return apptsForDay;

};

export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.interviewers.forEach(interviewerId => {
        interviewersForDay.push(state.interviewers[interviewerId])
      })
    }
  })
  return interviewersForDay
};

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer }
};

export function getSpotsForDay(state, dayName) {
  const appointments = getAppointmentsForDay(state, dayName);
  return appointments.reduce((prev, curr) => {
    if (curr.interview !== null) {
      return prev - 1;
    }
    return prev;
  }, appointments.length);
};