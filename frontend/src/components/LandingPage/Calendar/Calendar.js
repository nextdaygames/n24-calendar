
import React from "react";
import "./Calendar.css"
import Day from "./Day"
import DayNames from "./DayInfo"

export default class Calendar extends React.Component {
    render() {
        var dayColumns = []
        for (var i = 0 ; i < DayNames.length; i++) {
            dayColumns.push(<Day dayId={i}></Day>)
        }
        return (
            <div className="calendar row">
                {dayColumns}
            </div>
        );
    }
}