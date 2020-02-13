import React from 'react';
import './App.scss';

import Home from "./pages/Home";
import Navigation from './layouts/Navigation';
import Login from "./pages/Login";

import {BrowserRouter as Router} from "react-router-dom";
const Route = require('react-router-dom').Route;

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navigation/>
                    <Route path={'/'} component={Home} exact />
                    <Route path={'/login'} component={Login} exact />
                </div>
            </Router>
        );
    }
}
