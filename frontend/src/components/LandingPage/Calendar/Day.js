
import React from "react";
import "./Calendar.css"
import DayNames from "./DayInfo"

export default class Day extends React.Component {
    render() {
        var isOdd = this.props.dayId % 2
        var className = "day col " + (isOdd ? "odd" : "even")

        var hours = []
        for (var h = 1 ; h <= 16; h++) {
            hours.push(<div class="row">
                <div className="hour">
                    <p className="hour-label">{h}</p>
                </div>
            </div>)
        }

        return (
            <div class={className}>
                <p>{DayNames[this.props.dayId]}</p>
                <p>4/4/4 12:30pm</p>
                {hours}
            </div>
        );
    }
}