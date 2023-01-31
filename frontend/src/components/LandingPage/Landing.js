
import React from "react";

import TopBar from "../TopBar/TopBar"
import Footer from "../Footer/Footer"
import Content from "./Content"


export default class Landing extends React.Component {
    render() {
        return (
            <div className="landing row">
                <TopBar/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}