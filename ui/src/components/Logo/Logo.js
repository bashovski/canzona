import React from 'react';
import './styles.scss';

export default class Logo extends React.Component {
    render() {
        const width = this.props.width ? this.props.width : 64;
        const style = {
            maxWidth: width,
            width: width
        };

        return(
            <div className="cna-logo" style={style}>
                <img src={require('../../assets/logo.svg')} alt=""/>
            </div>
        )
    }
}
