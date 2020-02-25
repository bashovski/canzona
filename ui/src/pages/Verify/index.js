import React, {Component, Suspense} from 'react';
import AuthAPI from '../../api/auth';
import './styles.scss';

export default class Verify extends Component {

    componentDidMount() {

        const key = window.location.pathname.split('/')[2];
        console.log(key);
        AuthAPI
        .verifyUser(key)
        .then(resp => {
            console.log(resp.data);
        }).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        return(
            <div>
                Verifying your account...
            </div>
        )
    }
}
