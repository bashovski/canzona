import React from 'react';
import './App.scss';

import Home from "./pages/Home";
import Navigation from './layouts/Navigation';
import Login from "./pages/Login";

import {BrowserRouter as Router} from "react-router-dom";
import AuthAPI from "./api/auth";
import LocalStorage from './services/LocalStorage/local';

const Route = require('react-router-dom').Route;

export default class App extends React.Component {

    state = {
        userAuthenticated: false
    };

    componentDidMount() {
        AuthAPI
        .authenticate(LocalStorage.getAccessToken())
        .then(resp => {
            console.log(resp.data);
            this.setState({
               userAuthenticated: true
            });
        }).catch(err => {
            LocalStorage.setAccessToken('');
        });
    }

    render() {
        // TODO: make seperate file for routes and import them in App (here).
        const routes = [
            {name: 'Login', component: Login, path: '/login'}
        ];
        let routesJSX = [];
        for(let i = 0, length = routes.length; i < length; i++) {
            routesJSX.push(
                <Route path={routes[i].path} component={routes[i].component} exact />
            )
        }
        return (
            <Router>
                <div className="App">
                    <Navigation/>
                    <Route path={'/'} component={Home} exact />

                    {
                        this.state.userAuthenticated ? (
                            /* Middleware-protected routes */
                            <Route path={'/web/player'} component={Login} exact />
                        ) : (
                            /* Routes that are accessible while logged-out or while being unauthenticated */
                            routesJSX
                        )
                    }
                </div>
            </Router>
        );
    }
}
