import React from 'react';
import Links from "../../services/Navigation/links";
import Logo from "../../components/Logo/Logo";
import './styles.scss';

export default class Navigation extends React.Component {
    render() {
        let links = [];
        for(let i = 0, length = Links.length; i < length; i++) {
            links.push(
                <a href={Links[i].route} key={i+1}>{Links[i].name}</a>
            );
        }

        return(
            <nav className="cna-nav">
                <div className="cna-nav-links">
                    <a className="cna-nav-links-logo" href="/"><Logo width={48}/></a>
                    {links}
                </div>
                <a className="cna-nav-login_btn" href="/login">
                    Login
                </a>
            </nav>
        );
    };
}
