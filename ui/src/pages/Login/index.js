import React from 'react';
import './styles.scss';
import Logo from "../../components/Logo/Logo";
import AuthAPI from "../../api/auth";
import LocalStorage from '../../services/LocalStorage/local';

const isValidEmail = require('../../services/Validation/isValidEmail');

const STEP_EMAIL = 1,
      STEP_PASSWORD = 2;

export default class Login extends React.Component {

    state = {
        userInput: '',
        email: '',
        password: '',
        step: STEP_EMAIL,
        error: null
    };

    inputFieldRef = React.createRef();

    handleInputUpdate = (event) => {
        this.setState({
            userInput: event.target.value
        });
        console.log(this.state.userInput);
    };

    resetInput = () => {
        console.log('resetInput');
        this.setState({
            userInput: '',
            error: ''
        });
        this.inputFieldRef.current.value = '';
    };

    handleErrors = (statusCode, statusText) => {
        console.log(statusCode, statusText);

        if(statusCode === 401) {
            if(this.state.step === STEP_EMAIL)
                return this.setError('Email you \'ve entered doesn\'t belong to any account here.');
            return this.setError(`You 've entered the wrong password, please try again.`);
        }
        return this.setError(`An error has occurred while trying to log you in.`);
    };

    setError = (err) => {
        this.setState({
            error: err
        });
    };

    proceed = () => {

        let email = '', password = '';
        if(this.state.step === STEP_EMAIL)
            email = this.state.userInput.toString().trim();
        else {
            email = this.state.email.toString().trim();
            password = this.state.userInput.toString().trim();
        }

        if((this.state.step === STEP_PASSWORD && password.length <= 0) || !isValidEmail(email)) return;

        AuthAPI
        .login(this.state.step, email, password)
        .then(resp => {
            console.log(resp.data);
            this.resetInput();
            if(this.state.step === STEP_EMAIL) {
                return this.setState({
                    step: STEP_PASSWORD,
                    email: email
                });
            }
            LocalStorage.setAccessToken(resp.data.jwtKey);
        }).catch(err => {
            console.log(err.response);
            this.handleErrors(err.response.status, err.response.statusText);
        }).finally(() => {

        });
    };

    isInputValid() {
        return !(this.state.step === STEP_EMAIL && !isValidEmail(this.state.userInput.toString().trim()) || this.state.step === STEP_PASSWORD);
    };

    getTickStyle() {
        return this.isInputValid() ? {
            opacity: 1
        } : {
            opacity: 0
        };
    };

    getInputType() {
        return this.state.step === STEP_EMAIL ? 'text' : 'password';
    };
    getInputPlaceholder() {
        return this.state.step === STEP_EMAIL ? 'Email' : 'Password';
    }

    render() {
        return(
            <div className="cna-login">
                <div className="cna-login-form">
                    <Logo/>
                    <div className="cna-login-form-input">
                        <input type={this.getInputType()}
                               placeholder={this.getInputPlaceholder()}
                               onChange={this.handleInputUpdate}
                               ref={this.inputFieldRef}/>
                        <img src={require('../../assets/icons/tick.svg')} alt="" style={this.getTickStyle()}/>
                    </div>
                    <div className="cna-login-form-error">
                        {this.state.error}
                    </div>
                    <div className="cna-login-form-btn" onClick={this.proceed}>
                        Proceed
                    </div>
                </div>
            </div>
        )
    }
}
