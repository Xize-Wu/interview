import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const dayListItems = props.days.map((day) =>{
    return <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === day}
    setDay={props.setDay}  
  />
  })
  return(
    <ul>
      {dayListItems}
    </ul>
  )}