import React from "react";
import "./Content.css"
import { Button, ButtonGroup } from "react-bootstrap";
import BackendClient from "../../BackendClient";

export default class Content extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            wakeDate: null,
            sleepDate: null,
            eatDate: null,
            hasEatenToday: null,
            isAwake: null,
            suggestedEatTime: null,
            suggestedSleepTime: null,
            timeAwakeHours: null,
            timeAsleepHours: null,
            yourDay: null,
            healthRecords: []
        };
    }
    assignHealthRecords = (response) => {

        var wakeTime = this.getLastRecordTime(response["data"]["healthRecords"], "WAKE")
        var sleepTime = this.getLastRecordTime(response["data"]["healthRecords"], "SLEEP")
        var eatTime = this.getLastRecordTime(response["data"]["healthRecords"], "EAT")
        var currentTime = new Date()
        var hasEatenToday = eatTime > wakeTime
        var isAwake = wakeTime > sleepTime

        var suggestedEatTime = null
        if (!hasEatenToday) {
            suggestedEatTime = new Date(wakeTime)
            suggestedEatTime.setHours(suggestedEatTime.getHours() + 11)
        }

        var suggestedSleepTime = null
        var timeAwakeHours = null
        var timeAsleepHours = null
        if (isAwake) {
            suggestedSleepTime = new Date(wakeTime)
            suggestedSleepTime.setHours(suggestedSleepTime.getHours() + 16)
            timeAwakeHours = Math.round((currentTime.getTime() - wakeTime.getTime()) / 1000 / 60 / 60)
        }
        else {
            timeAsleepHours = Math.round((currentTime.getTime() - sleepTime.getTime()) / 1000 / 60 / 60)
        }


        var state = {
            wakeDate: wakeTime,
            sleepDate: sleepTime,
            eatDate: eatTime,
            hasEatenToday: hasEatenToday,
            isAwake: isAwake,
            suggestedEatTime: suggestedEatTime,
            suggestedSleepTime: suggestedSleepTime,
            timeAwakeHours: timeAwakeHours,
            timeAsleepHours: timeAsleepHours,
            yourDay: this.getYourDay(response["data"]["healthRecords"]),
            healthRecords: response["data"]["healthRecords"]
        }
        console.log(state)
        this.setState(state)
    }

    getDayName(dateStr, locale)
    {
        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });        
    }


    getYourDay = (records) => {
        var mondayDate = new Date("2023-01-30T18:08:00.000Z")
        for (var i = 0; i < records.length; i++) {
            var record = records[i]
            if (record["record_type"] !== "SLEEP") {
                continue
            }
            mondayDate.setHours(mondayDate.getHours() + 24)
        }
        return this.getDayName(mondayDate)
    }

    getHealthRecords = () => {
        BackendClient.getHealthRecords(this.assignHealthRecords)
    }

    logRecord = (recordType) => {
        BackendClient.createHealthRecord(recordType, () => { this.getHealthRecords() })
    }

    componentDidMount = () => {
        this.getHealthRecords()
    }

    getLastRecordTime = (records, recordType) => {
        for (var i = 0; i < records.length; i++) {
            var record = records[i]
            if (record["record_type"] !== recordType) {
                continue
            }
            return new Date(record["created_utc"] + "Z")
        }
        return null
    }

    getTimeAwake = () => {
        var currentTime = new Date()
        var lastWakingTime = this.getLastRecordTime("WAKE")
        if (lastWakingTime === null) {
            return
        }
        var timeAwakeHours = Math.round((currentTime.getTime() - lastWakingTime.getTime()) / 1000 / 60 / 60)
        return timeAwakeHours
    }

    getTimePlusHours = (date, hours) => {
        if (date === null) {
            return
        }
        var newDate = new Date()
        newDate.setHours(date.getHours() + hours)
        return newDate
    }

    createSuggestions = () => {
        var suggestionElements = []

        if (this.state.yourDay !== null) {
            suggestionElements.push(<p key="yourDay">It is your {this.state.yourDay}.</p>)
        }

        if (this.state.timeAwakeHours !== null) {
            suggestionElements.push(<p key="timeAwake">You have been awake for {this.state.timeAwakeHours} hours.</p>)
        }

        if (this.state.timeAsleepHours !== null) {
            suggestionElements.push(<p key="timeAsleep">You have been asleep for {this.state.timeAsleepHours} hours.</p>)
        }

        if (this.state.isAwake === true && this.state.wakeDate !== null) {
            suggestionElements.push(<p key="wokeTime">You woke at {this.state.wakeDate.toLocaleString()}.</p>)
        }

        if (this.state.isAwake === true && this.state.hasEatenToday === true) {
            suggestionElements.push(<p key="ateTime">You ate at {this.state.eatDate.toLocaleString()}.</p>)
        }

        if (this.state.hasEatenToday !== true && this.state.suggestedEatTime !== null) {
            suggestionElements.push(<p key="eatTimeSuggestion">You should eat at {this.state.suggestedEatTime.toLocaleString()}.</p>)
        }
        if (this.state.suggestedSleepTime !== null) {
            suggestionElements.push(<p key="sleepTimeSuggestion">You should sleep at {this.state.suggestedSleepTime.toLocaleString()}.</p>)
        }
        return suggestionElements
    }

    render() {
        
        return (
            <div className="content col-12">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 health-statements">
                        {this.createSuggestions()}
                    </div>
                    <div className="col-12 col-sm-6">
                        <ButtonGroup>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("SLEEP")}}>Log Sleep</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("WAKE")}}>Log Wake</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("EAT")}}>Log Eat</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}