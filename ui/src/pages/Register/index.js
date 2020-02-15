import React, {Component} from "react";
import Form from "../../components/Form";
import Logo from "../../components/Logo/Logo";
import ErrorNotice from "../../components/ErrorNotice";
import AuthAPI from "../../api/auth";
import './styles.scss';

const isValidEmail = require('../../services/Validation/isValidEmail');

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

    handleInputUpdate(input, event) {
        this.setState({
            [input]: event.target.value
        })
    }

    getTickStyle(input) {
        if(input === 'email') {
            return isValidEmail(this.state.email) ? {
                opacity: 1
            } : {
                opacity: 0
            };
        }
    }

    proceed() {
        const errors = this.getInputValidationErrors();
        if(!errors) return this.register();
        this.displayValidationError(errors[0]);
    }

    displayValidationError(error) {

    }

    register() {
        AuthAPI
        .register(this.state.email, this.state.name, this.state.surname, this.state.username, this.state.password)
        .then(resp => {
            console.log(resp.data);
        }).catch(err => {
            console.log(err);
        })
    }

    getInputValidationErrors() {

    }

    render() {
        return(
            <div className="cna-register">
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
                            <input type="password" placeholder="Password" onChange={(event) => {this.handleInputUpdate('password', event)} }/>
                            <input type="password" placeholder="Password confirmation" onChange={(event) => {this.handleInputUpdate('passwordConfirmation', event)} }/>
                        </div>
                        <div className="cna-register-btn" onClick={this.proceed()}>REGISTER</div>
                        <ErrorNotice/>
                    </div>
                } />
            </div>
        );
    }
}
