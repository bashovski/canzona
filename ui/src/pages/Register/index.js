import React, {Component} from "react";
import Form from "../../components/Form";
import Logo from "../../components/Logo/Logo";
import ErrorNotice from "../../components/ErrorNotice";
import AuthAPI from "../../api/auth";
import './styles.scss';
import LocalStorage from "../../services/LocalStorage/local";

const isValidEmail = require('../../services/Validation/isValidEmail');
const registerErrors = require('../../services/Validation/register');

export default class Register extends Component {

    state = {
        email: '',
        name: '',
        surname: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        error: ''
    };

    handleInputUpdate = (input, event) => {
        this.setState({
            [input]: event.target.value
        })
    };

    getTickStyle = (input) => {
        if(input === 'email') {
            return isValidEmail(this.state.email) ? {
                opacity: 1
            } : {
                opacity: 0
            };
        }
    };

    handleResponseError = (field) => {
        this.setError(registerErrors.errors[field]);
    };

    proceed = () => {
        const error = this.getInputValidationError();
        if(!error) return this.register();
        this.setError(error);
    };

    setError = (err) => {
        this.setState({
            error: err
        });
    };

    unmountErrorNotice = () => {
        this.setState({
            error: null
        });
    };

    handleResponseValidationErrors = (field) => {
        this.setError(registerErrors.validationErrors[field]);
    };

    displayErrorNotice = () => {
        return(
            <ErrorNotice unmount={() => {this.unmountErrorNotice()}} error={this.state.error}/>
        );
    };

    register = () => {
        AuthAPI
        .register(this.state.email, this.state.name, this.state.surname, this.state.username, this.state.password)
        .then(resp => {
            LocalStorage.setAccessToken(resp.data.jwtKey);
            window.location.href = `/player?first_login=${resp.data.createdAt}`;
        }).catch(err => {
            if(err.response.data.errors) this.handleResponseValidationErrors(Object.keys(err.response.data.errors));
            else this.handleResponseError(Object.keys(err.response.data.keyValue)[0]);
        })
    };

    getInputValidationError = () => {
        // Validate email
        if(!isValidEmail(this.state.email)) return 'Invalid email, please insert the correct one.';

        // Validate name & surname
        const expPattern = /^[a-zA-Z]*$/;
        if(!expPattern.test(this.state.name) || this.state.name.length === 0) return `You 've provided invalid name. Please insert the valid one.`;
        if(!expPattern.test(this.state.surname) || this.state.surname.length === 0) return `You 've provided invalid name. Please insert the valid one.`;

        // Validate username, further validation will be done by the back-end
        if(this.state.username.length === 0) return 'Insert the username you\'ll be using for your account.';

        // Validate if the password is inserted, further validation will be done by the back-end
        if(this.state.password.length === 0) return 'Insert desired password, please.';
        if(this.state.passwordConfirmation !== this.state.password) return 'Inserted passwords do not match.';
    };

    render = () => {
        const error = this.state.error ? this.displayErrorNotice() : null;
        return(
            <div className="cna-register">
                {error}
                <Form content={
                    <div>
                        <Logo/>
                        <div className="cna-register-heading">
                            Create Account
                        </div>
                        <div className="cna-register-inputs">

                            <input type="text" placeholder="Email" onChange={(event) => {this.handleInputUpdate('email', event)} }/>
                            <img src={require('../../assets/icons/tick.svg')} alt="" style={this.getTickStyle('email')}/>

                            <div className="cna-register-inputs-row">
                                <input type="text" placeholder="Name" onChange={(event) => {this.handleInputUpdate('name', event)} }/>
                                <input type="text" placeholder="Surname" onChange={(event) => {this.handleInputUpdate('surname', event)} }/>
                            </div>
                            <input type="text" placeholder="Username" onChange={(event) => {this.handleInputUpdate('username', event)} }/>
                            <input type="password" style={{marginTop: 30}} placeholder="Password" onChange={(event) => {this.handleInputUpdate('password', event)} }/>
                            <input type="password" placeholder="Password confirmation" onChange={(event) => {this.handleInputUpdate('passwordConfirmation', event)} }/>
                        </div>
                        <div className="cna-register-btn" onClick={this.proceed}>REGISTER</div>
                    </div>
                } />
            </div>
        );
    }
}
