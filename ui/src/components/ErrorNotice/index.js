import React, {Component} from 'react';
import './styles.scss';

export default class ErrorNotice extends Component {

    state = {
        class: ''
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                class: 'displayed'
            });
            setTimeout(() => {
                this.setState({
                    class: ''
                });
                setTimeout(this.props.unmount, 500);
            }, 4500);
        }, 100);
    }

    render() {
        return(
            <div className={`cna-error_notice ${this.state.class}`}>
                {this.props.error}
            </div>
        )
    }
}
