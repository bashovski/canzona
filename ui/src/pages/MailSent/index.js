import React, {Component} from 'react';
import Form from "../../components/Form";
import Button from "../../components/Button";
import './styles.scss';

export default class MailSent extends Component {
    render() {
        return(
            <div className="cna-mail_sent">
                <Form content={
                    <div className="cna-mail_sent-items">
                        <img src={require('../../assets/success.svg')} alt=""/>
                        <p>Email successfully sent.</p>
                        <Button link="/" value="Return to homepage"/>
                    </div>
                } />
            </div>
        );
    }
}
