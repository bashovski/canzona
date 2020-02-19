import React, {Component} from "react";
import './styles.scss';

export default class SideNavigationItem extends Component {
    render() {
        console.log(this.props.src);
        return(
            <div className="cna-side_navigation-item">
                <img src={this.props.src} alt=""/>
            </div>
        );
    }
}
