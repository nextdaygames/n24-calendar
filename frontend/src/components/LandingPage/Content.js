import React from "react";
import "./Content.css"
import { Button, ButtonGroup, ProgressBar } from "react-bootstrap";
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
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
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
        var timeAwakeHours = Math.round((currentTime.getTime() - lastWakingTime.getTime()) / 1000 / 60 )
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

    getWakingProgress = () => {
        if (!(this.state.isAwake === true && this.state.wakeDate !== null && this.state.suggestedSleepTime !== null)) {
            return 100
        }
        var wakeHours = this.state.wakeDate.getHours()
        var currentTime = new Date().getHours() - wakeHours
        var endTime = this.state.suggestedSleepTime.getHours() - wakeHours
        return currentTime / endTime * 100
    }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        var progressValue = this.getWakingProgress()
        var progress = Math.min(Math.max(progressValue, 0), 100);

        var sortedHealthRecords = this.state.healthRecords.sort((a,b) => new Date(a["created_utc"]).getMilliseconds() - new Date(b["created_utc"]).getMilliseconds())
        var events = sortedHealthRecords.map((record) => <p key={record["created_utc"]}>{record["record_type"]} at {new Date(record["created_utc"] + "Z").toLocaleString()}</p>)
        return (
            <div className="content col-12">
                <div className="row progress-row">
                    <div className="col-12">
                        <ProgressBar label={this.state.timeAwakeHours !== null && this.state.timeAwakeHours < 16 ? this.state.timeAwakeHours + " hours awake, sleep in " + (16 - this.state.timeAwakeHours) : ""} now={progress} />
                    </div>
                </div>
                <div>
                <div className="row">
                        <ButtonGroup>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("SLEEP")}}>Sleep</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("WAKE")}}>Woke</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("EAT")}}>Ate</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("MOD_100")}}>Modafinil 100mg</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("MOD_50")}}>Modafinil 50mg</Button>
                            <Button variant="outline-primary" className="checkout-button" onClick={()=>{this.logRecord("COFFEE")}}>Coffee</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="row health-statements">
                    <h3 className="events-header">Suggestions</h3>
                    {this.createSuggestions()}
                </div>
                <div className="row health-statements">
                    <h3 className="events-header">Events</h3>
                    {events}
                </div>
            </div>
        );
    }
}