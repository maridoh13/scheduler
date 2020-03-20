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
    appointments: {},
    interviewers: {} /////
  })
  
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
          appointments,
          interviewers
        }))
      })} ,[state.day]);
      
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  };

  const interviewers = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day)

  const schedule = appointments.map((a) => { 
    // console.log("Interviewers:", getInterviewersForDay(state, day))
    const interview = getInterview(state, a.interview);
      return (
      <Appointment key={a.id} {...a} id={props.bookInterview}  interviewers={interviewers} interview={interview} />)
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
