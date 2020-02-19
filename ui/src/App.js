import React from 'react';
import './App.scss';

import Navigation from './layouts/Navigation';
import NotFound from "./pages/NotFound";

import {BrowserRouter as Router, Switch} from "react-router-dom";
import AuthAPI from "./api/auth";
import LocalStorage from './services/LocalStorage/local';
import router from "./router";

const Route = require('react-router-dom').Route;

export default class App extends React.Component {

    state = {
        userAuthenticated: false,
        awaitingResponse: true
    };

    componentDidMount() {
        AuthAPI
        .authenticate(LocalStorage.getAccessToken())
        .then(resp => {
            console.log(resp.data);
            this.setState({
               userAuthenticated: true
            });
        }).catch(() => {
            LocalStorage.setAccessToken('');
        }).finally(() => {
            this.setState({
                awaitingResponse: false
            });
        });
    }

    initializeRoutes = () => {
        let jsx = [];
        const middleware = this.state.userAuthenticated ? 'auth' : 'no-auth';

        for(let i = 0, len = router.routes.length; i < len; i++) {
            if(!router.routes[i].middleware || router.routes[i].middleware === middleware) {
                jsx.push(
                    <Route key={i} path={router.routes[i].path} component={router.routes[i].component} exact />
                );
            } else {
                console.log('protected-route: '+ router.routes[i].path);
                jsx.push(
                    <Route key={i} path={router.routes[i].path} component={NotFound} exact />
                )
            }
        }

        console.log(jsx);

        return jsx;
    };

    render() {
        // TODO: Replace the loading container with a properly made one that would contain a loading anim.
        return this.state.awaitingResponse ? (<div>Loading...</div>) : (
            <div className="App">
                <Router>
                    <Navigation userAuthenticated={this.state.userAuthenticated}/>
                    <Switch>
                        {this.initializeRoutes()}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
