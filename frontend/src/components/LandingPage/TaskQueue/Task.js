
import React from "react";
import "./Tasks.css"

export default class Task extends React.Component {
    render() {
        return (
            <div className="task row" key={this.props.name}>
                <div className="col-1">
                    <p className="task-label">{this.props.points}</p>
                </div>
                <div className="col-7">
                    <p className="task-label">{this.props.name}</p>
                </div>
                <div className="col">
                    <p className="task-label"><span>^</span><span>v</span></p>
                </div>
            </div>
        );
    }
}