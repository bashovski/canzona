import React from 'react';
import './styles.scss';

export default class Button extends React.Component {

    render() {
        return(
            <a href={this.props.link} className="cna-btn">
                {this.props.value}
            </a>
        )
    }
};
