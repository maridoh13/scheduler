import React from "react";
import useApplicationData from "hooks/useApplicationData"
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterviewersForDay, getInterview, getSpotsForDay } from "../helpers/selectors"

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
      
  const interviewers = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day)
  const remainingSpots = getSpotsForDay(state, state.day)

  const schedule = appointments.map((appt) => { 
    const interview = getInterview(state, appt.interview);
      return (
      <Appointment 
        key={appt.id} 
        {...appt} 
        spots={remainingSpots}
        interviewers={interviewers} 
        interview={interview} 
        bookInterview={bookInterview}  
        cancelInterview={cancelInterview}
      />)
  });

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
            day={state.day}
            setDay={setDay}
            spots={remainingSpots}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>

    </main>

  );
}
