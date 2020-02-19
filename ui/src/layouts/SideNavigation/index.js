import React, {Component} from "react";
import SideNavigationItem from "../../components/SideNavigationItem";
import './styles.scss';

export default class SideNavigation extends Component {
    render() {
        return(
            <div className="cna-side_navigation">
                <div className="cna-side_navigation-items">
                    <SideNavigationItem src={require('../../assets/icons/home.svg')} />
                    <SideNavigationItem src={require('../../assets/icons/playlist.svg')} />
                    <SideNavigationItem src={require('../../assets/icons/trending.svg')} />
                    <SideNavigationItem src={require('../../assets/icons/radio.svg')} />
                </div>
                <div className="cna-side_navigation-avatar">
                    <img src={require('../../assets/avatar.png')} alt=""/>
                </div>
            </div>
        )
    }
}
