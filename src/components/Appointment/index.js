import React from "react";
import "./style.scss";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";



export default function Appointment(props) {
  let display = props.interview ? 
  <Show 
    student={props.interview.student} 
    interviewer={props.interview.interviewer} /> 
  : 
  <Empty/>
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      { display }
    </article>
  );
}
