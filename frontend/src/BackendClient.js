import axios from "axios";

export default class BackendClient {
    
    static #request(url, method, body, thenCallback, catchCallback) {
        if (thenCallback === null || thenCallback === undefined) {
            thenCallback = (response) => {}
        } 
        if (catchCallback === null || catchCallback === undefined) {
            catchCallback = (requestError) => {console.log(requestError)}
        } 
        var baseUrl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://127.0.0.1:5000" : "https://health-monitor.herokuapp.com/"
        var uri = baseUrl + url
        var config = {
            method: method.toUpperCase(),
            url: uri,
            headers: { 
                'Content-Type': 'application/json'
            },
        };

        if (body !== null) {
            config["data"] = JSON.stringify(body);
        }

        axios(config)
        .then(thenCallback)
        .catch(catchCallback)
    }

    static getHealthRecords(thenCallback, catchCallback) {
        this.#request('/health-records', "GET", null, thenCallback, catchCallback)
    }

    static createHealthRecord(recordType, thenCallback, catchCallback) {
        this.#request('/health-records', "POST", { recordType: recordType}, thenCallback, catchCallback)
    }

    static getTasks(thenCallback, catchCallback) {
        this.#request('/tasks', "GET", null, thenCallback, catchCallback)
    }

    static createTask(name, points, thenCallback, catchCallback) {
        this.#request('/tasks', "POST", { name: name, points: points }, thenCallback, catchCallback)
    }
}