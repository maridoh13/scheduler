import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 

    const activeDay = state.days.find((day) => {
      return day.name = state.day
    })

    const updatedDay = {
      ...activeDay, 
      spots: activeDay.spots - 1
    }

    const updatedDays = state.days.map((day) => {
      if (day.name === updatedDay.name) {
        return updatedDay
      }
      return day
    })
    
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
      return day.name = state.day
    })

    const updatedDay = {
      ...activeDay, 
      spots: activeDay.spots + 1
    }

    const updatedDays = state.days.map((day) => {
      if (day.name === updatedDay.name) {
        return updatedDay
      }
      return day
    })

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
}




