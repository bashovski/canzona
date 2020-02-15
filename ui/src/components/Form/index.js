import React, {Component} from "react";
import './styles.scss';

export default class Form extends Component {

    /**
     * Note: Always provide a container for the content inside a Form (e.g. a <div> element with child elements/components, etc.)
     * @returns {*}
     */
    render() {
        return(
            <div className="cna-form">
                {this.props.content}
            </div>
        );
    }
}
