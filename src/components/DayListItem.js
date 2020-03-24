import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  function formatSpots(props) {
    let { spots } = props
    if (spots === 0) {
      let message = "no spots remaining"
      return message;
    }
    if (spots === 1) {
      let message = "1 spot remaining"
      return message;
    }
    else {
      let message = spots + " spots remaining"
      return message;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}


