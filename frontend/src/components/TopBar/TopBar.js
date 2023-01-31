import React from "react";
import "./TopBar.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export default class TopBar extends React.Component {
    render() {
        return (
            <Navbar className="topbar" bg="light" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">Health Monitor</Link>
                    </Navbar.Brand>            
                </Container>
            </Navbar>
        );
    }
}