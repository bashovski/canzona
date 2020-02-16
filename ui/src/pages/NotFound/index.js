import React, {Component} from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button";
import './styles.scss';

export default class Index extends Component {
    render() {
        return(
            <div className="cna-not_found">
                <div className="cna-not_found-code">
                    <span>4</span>
                    <Logo/>
                    <span>4</span>
                </div>
                <div className="cna-not_found-text">
                    The page you were looking for doesn't exist or has expired.
                </div>
                <div className="cna-not_found-cta">
                    <Button link="/" value={`Go to Homepage`} />
                </div>
            </div>
        );
    }
}
