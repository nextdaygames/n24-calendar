import './App.css';

import React from "react";
import Landing from "./components/LandingPage/Landing.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartId: localStorage.getItem("cartId"),
            cart: null,
            cartItems: [],
            products: [],
            isModifyingCartQuantity: 0,
        };
    }

    

    componentDidMount = () => {
    }

    render = () => {
        return (
            <BrowserRouter>
                <div className="App container-fluid">
                    <Routes>
                        <Route key="home" path="/" element={
                            <Landing />
                        }/>
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}
