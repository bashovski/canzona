import React, {Component} from 'react';
import Form from "../../components/Form";
import './styles.scss';
import Logo from "../../components/Logo/Logo";
import ErrorNotice from "../../components/ErrorNotice";
import isValidEmail from '../../services/Validation/isValidEmail';
import AuthAPI from '../../api/auth';
import Router from '../../router';

export default class ForgotPassword extends Component {

    state = {
        userInput: '',
        error: ''
    };
    inputFieldRef = React.createRef();

    handleInputUpdate = (event) => {
        this.setState({
            userInput: event.target.value
        });
    };

    resetInput = () => {
        this.setState({
            userInput: '',
            error: ''
        });
        this.inputFieldRef.current.value = '';
    };

    handleErrors = (statusCode, statusText) => {
        if(statusCode === 400 || statusCode === 500)
            return this.setError('An error has occurred, please try again later.');
        if(statusCode === 429)
            return this.setError(`You 've already requested an account recovery. Check your inbox (perhaps Spam folder?)`);
        if(statusCode === 404)
            return this.setError('Email you \'ve entered doesn\'t belong to any account.');
        if(!isValidEmail(this.state.userInput))
            return this.setError('Invalid email provided.');
    };

    getTickStyle() {
        return isValidEmail(this.state.userInput) ? {
            opacity: 1
        } : {
            opacity: 0
        };
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

    proceed = () => {
        const email = this.state.userInput;
        AuthAPI.requireAccountRecovery(email)
        .then(resp => {
            console.log(resp);
            Router.redirectTo({
                name: 'MailSent'
            });
        }).catch(err => {
            console.log(err);
            this.handleErrors(err.response.status, null);
        });
    };

    render() {
        const error = this.state.error ? this.displayErrorNotice() : null;
        return(
            <div className="cna-forgot_password">
                {error}
                <Form content={
                    <div>
                        <Logo/>
                        <div className="cna-login-form-heading">
                            Forgot your password?
                        </div>
                        <div className="cna-login-form-input">
                            <input placeholder="Insert your email"
                                   onChange={this.handleInputUpdate}
                                   ref={this.inputFieldRef}/>
                            <img src={require('../../assets/icons/tick.svg')} alt="" style={this.getTickStyle()}/>
                        </div>
                        <div className="cna-login-form-btn" onClick={this.proceed}>
                            Recover Account
                        </div>
                    </div>
                }/>
            </div>
        )
    }
};
