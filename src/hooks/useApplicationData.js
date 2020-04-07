import {useState, useEffect} from "react";
import axios from "axios";
import getAppointmentsForDay from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

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

      })}, [state.day]);
     
     
  function bookInterview(id, interview) {

    const editing = function() {
      if (state.appointments[id].interview === null) {
        return false;
      } else {
        return true;
      }
    };

    const spotsLeft = function(appts) {
      let count = 0;
      for (const item in appts) {
        if (appts[item].interview === null) {
          count++;
        }
      }
      if (editing()) {
        return count;
      } else {
        return count - 1;
      }
    };

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const activeDay = state.days.find((day) => {
      return day.name === state.day
    });

    const daysAppts = getAppointmentsForDay(state, activeDay.name);
    const numSpots = spotsLeft(daysAppts);


    const updatedDay = {
      ...activeDay,
     spots: numSpots
    };

    const updatedDays = state.days.map((day) => {
      if (day.name === updatedDay.name) {
        return updatedDay
      }
      return day
    });

    return (
      axios.put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState({...state, appointments, days: updatedDays})
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    )

  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const activeDay = state.days.find((day) => {
      return day.name === state.day
    });

    const updatedDay = {
      ...activeDay,
      spots: activeDay.spots + 1
    };

    const updatedDays = state.days.map((day) => {
      if (day.name === updatedDay.name) {
        return updatedDay
      }
      return day
    });

    return (
      axios.delete(`/api/appointments/${id}`)
        .then((response) => {
          setState({...state, appointments, days: updatedDays})
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    )
  };


  return { state, setDay, bookInterview, cancelInterview }
};
