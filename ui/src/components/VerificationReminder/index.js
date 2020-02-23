import React, {Component} from "react";
import Form from "../Form";
import AuthAPI from '../../api/auth';
import './styles.scss';

export default class VerificationReminder extends Component {

    resendEmail = () => {
        AuthAPI
        .requireVerificationEmail()
        .then(resp => {

        }).catch(err => {

        });
    };

    render() {
        return(
            <div className="cna-verification_reminder">
                <Form content={
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
                        <button>Resend email</button>
                        <div className="cna-verification_reminder-logout">or <a href="/logout">Logout</a></div>
                    </div>
                }/>
            </div>
        )
    }
}
