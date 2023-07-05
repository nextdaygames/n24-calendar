import React from "react";
import "./Content.css"
import { Button, ButtonGroup, ProgressBar } from "react-bootstrap";
import BackendClient from "../../BackendClient";
import Calendar from "./Calendar/Calendar";
import TaskQueue from "./TaskQueue/TaskQueue"
import TaskForm from "./TaskForm/TaskForm"

export default class Content extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount = () => {
        
    }

    render() {
        
        return (
            <div className="content col-12">
                {/* <div className="row progress-row">
                    <div className="col-12">
                        <ProgressBar label={this.state.timeAwakeHours !== null && this.state.timeAwakeHours < 16 ? this.state.timeAwakeHours + " hours awake, sleep in " + (16 - this.state.timeAwakeHours) : ""} now={progress} />
                    </div>
                </div> */}
                <div>
                    <div className="row">
                        <ButtonGroup>
                            <Button variant="outline-primary" className="checkout-button health-button" onClick={()=>{this.logRecord("WAKE")}}>Woke</Button>
                        </ButtonGroup>
                    </div>
                </div>
                {/* <div className="row health-statements">
                    <h3 className="events-header">Suggestions</h3>
                    {this.createSuggestions()}
                </div> */}
                {/* <div className="row health-statements">
                    <h3 className="events-header">Events</h3>
                    {events}
                </div> */}
                <div className="row">
                    <h3 className="events-header">Calendar</h3>
                    {/* <Calendar/> */}
                    <TaskForm/>
                    <TaskQueue/>
                </div>
            </div>
        );
    }
}