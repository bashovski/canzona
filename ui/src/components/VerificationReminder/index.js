import React, {Component, Suspense} from "react";
import Form from "../Form";
import ErrorNotice from "../ErrorNotice";
import AuthAPI from '../../api/auth';
import LocalStorage from '../../services/LocalStorage/local';
import './styles.scss';

export default class VerificationReminder extends Component {

    state = {
        error: '',
        awaitingResponse: false,
        succeeded: false
    };

    resendEmail = () => {

        if(this.state.awaitingResponse) return;
        const token = LocalStorage.getAccessToken();

        this.setState({
            awaitingResponse: true
        });

        AuthAPI
        .requireVerificationEmail(token)
        .then(resp => {
            console.log(resp);
            this.setState({
                succeeded: true
            });
        }).catch(err => {
            console.log(err.response);
            this.setError(`You've already resent the verification email. Check your inbox or wait a couple of minutes.`);
        }).finally(() => {
            this.setState({
                awaitingResponse: false
            });
        });
    };


    setError = (err) => {
        this.setState({
            error: err
        });

    };

    unmountErrorNotice() {
        this.setState({
            error: null
        });
    }

    displayErrorNotice() {
        return(
            <ErrorNotice unmount={() => {this.unmountErrorNotice()}} error={this.state.error}/>
        );
    }

    render() {
        const error = this.state.error ? this.displayErrorNotice() : null;
        return(
            <div className="cna-verification_reminder">
                {error}
                <Form content={ !this.state.succeeded ?
                    (
                        <div className="cna-verification_reminder-body">
                            <div className="cna-verification_reminder-notice">
                                Verification of identity required
                            </div>
                            <div className="cna-verification_reminder-text">
                                In order to proceed, you'll need to verify your account.<br/>
                                You have already received an email regarding the verification of your account.
                                In case you didn't receive an email, please click the button below to resend it.
                                Before doing so, you may want to check your spam folder first.
                            </div>
                            <button onClick={this.resendEmail}>Resend email</button>
                            <div className="cna-verification_reminder-logout">or <a href="/logout">Logout</a></div>
                        </div>
                    ) :
                    (
                        <div className="cna-verification_reminder-body">
                            <img src={require('../../assets/success.svg')} alt=""/>
                            <div className="cna-verification_reminder-notice">
                                Success
                            </div>
                            <div className="cna-verification_reminder-text">
                                Check your inbox.
                            </div>
                        </div>
                    )
                }/>
            </div>
        )
    }
}
