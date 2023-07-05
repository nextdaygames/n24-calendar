
import React from "react";
import "./TaskForm.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BackendClient from "../../../BackendClient";

export default class TaskForm extends React.Component {

    clearFields() {
        console.log("done")
    }

    submit(name, points) {
        BackendClient.createTask(name, points, this.clearFields, ()=>{console.log("error")})
    }
    render() {
        var dayOptions = [1,2,3,4,5]
        var dayOptionDivs = dayOptions.map((dayOption) => (
            <Form.Check
            key={dayOption}
            inline
            label={dayOption}
            type="radio"
            />
          ))
        return <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Task Name" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            {dayOptionDivs}
        </Form.Group>
        
        
        <Button variant="primary" type="submit" onSubmit={this.submit}>
            Submit
        </Button>
        </Form>
    }
}