import React from 'react';
import {
    Route,
    HashRouter
} from "react-router-dom";
import Navigation from './layouts/Navigation';
import './App.scss';
import Home from "./pages/Home";

export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="App">
                    <Navigation/>
                    <div className="content">
                        <Route path={`/`} component={Home} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
