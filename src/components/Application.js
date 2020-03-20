import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterviewersForDay, getInterview } from "../helpers/selectors"



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  })
  const { day, days, appointments, interviewers } = state
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')), 
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
      .then(all => {
        const days = all[0].data
        const appointments = all[1].data
        const interviewers = all[2].data

        setState(prev => ({
          ...prev,
          days,
          appointments: getAppointmentsForDay({ days, appointments }, day),
          interviewers: getInterviewersForDay({ days, appointments, interviewers }, day)
        }))
      })} ,[day]);
      
      
const schedule = appointments.map((a) => { 
  // const interviewers = getInterviewersForDay(state, day)
  console.log("Interviewers:", getInterviewersForDay(state, day))
  const interview = getInterview(state, a.interview);
    return (
    <Appointment key={a.id} {...a} interviewers={state.interviewers} />)
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
            days={ state.days }
            day={ state.day }
            setDay={ setDay }
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
