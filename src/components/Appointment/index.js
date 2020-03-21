import React from "react";
import "./style.scss";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Form from "../Appointment/Form"
import Confirm from "../Appointment/Confirm"
import Status from "../Appointment/Status"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => console.log(error));
  }; 

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => console.log(error));
  }; 

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..."/>}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you want to delete this?" 
        onConfirm={deleteInterview}
        onCancel={() => back()}/>}
      {mode === CREATE && 
        <Form 
        name={props.name}
        interviewers={props.interviewers} 
        interviewer={props.interviewer}
        onCancel={back} 
        onSave={save}/>
      }
      {mode === EDIT && 
        <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save}/>
      }
    </article>
  );
}
