
import React from "react";
import "./Tasks.css"
import Task from "./Task";
import BackendClient from "../../../BackendClient";

export default class TaskQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }
    assigntasks = (response) => {
        console.log("rece")
        console.log(response)
        var state = {
            tasks: response["data"]["tasks"],
        }
        console.log(state)
        this.setState(state)
    }

    getTasks = () => {
        console.log("call")
        BackendClient.getTasks((response)=>{var state = {
            tasks: response["data"]["tasks"],
        }
        console.log(state)
        this.setState(state)})
    }

    componentDidMount = () => {
        this.getTasks()
    }

    render() {
        var tasks = this.state.tasks.sort((a,b) => {return a.order - b.order})
        var taskDivs = tasks.map((task) => <Task name={task.name} key={task.name} points={task.points}/>)
        return (
            <div className="taskQueue row">
                <div className="col">
                    {taskDivs}
                </div>
            </div>
        );
    }
}