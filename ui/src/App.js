import React, {Component, Suspense} from 'react';
import './App.scss';

import Navigation from './layouts/Navigation';
import SideNavigation from "./layouts/SideNavigation";
import NotFound from "./pages/NotFound";

import {BrowserRouter as Router, Switch} from "react-router-dom";
import AuthAPI from "./api/auth";
import LocalStorage from './services/LocalStorage/local';
import router from "./router";

const Route = require('react-router-dom').Route;
const VerificationReminder = React.lazy(() => {return import('./components/VerificationReminder')});

export default class App extends Component {

    state = {
        userAuthenticated: false,
        userVerified: true,
        awaitingResponse: true
    };

    componentDidMount() {
        AuthAPI
        .authenticate(LocalStorage.getAccessToken())
        .then(resp => {
            console.log(resp.data);
            this.setState({
                userAuthenticated: true,
                userVerified: resp.data.isVerified
            });
        }).catch(() => {
            LocalStorage.setAccessToken('');
        }).finally(() => {
            this.setState({
                awaitingResponse: false
            });
        });
    }

    renderVerificationReminder = () => {
        return !this.state.userVerified ? (<VerificationReminder/>) : ('');
    };

    initializeRoutes = () => {
        let jsx = [];
        const middleware = this.state.userAuthenticated ? 'auth' : 'no-auth';

        for(let i = 0, len = router.routes.length; i < len; i++) {
            if(!router.routes[i].middleware || router.routes[i].middleware === middleware)
                jsx.push(
                    <Route key={i} path={router.routes[i].path} component={router.routes[i].component} exact />
                );
            else jsx.push(
                    <Route key={i} path={router.routes[i].path} component={NotFound} exact />
                );
        }
        return jsx;
    };

    renderNavigation = () => {

        return !router.isNavDisabled(window.location.pathname) ? (
            <Navigation userAuthenticated={this.state.userAuthenticated}/>
        ) : <SideNavigation/>;
    };

    render() {
        // TODO: Replace the loading container with a properly made one that would contain a loading anim.
        return this.state.awaitingResponse ? (<div>Loading...</div>) : (
            this.state.userVerified ? (
                <div className="App">
                    <Router>
                        {this.renderNavigation()}
                        <Switch>
                            {this.initializeRoutes()}
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </div>
            ) : (
                <Suspense fallback={<div>Loading (suspense)...</div>}>
                    <VerificationReminder/>
                </Suspense>
            )
        );
    }
}
