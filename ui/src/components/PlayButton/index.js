import React, {Component} from "react";
import './styles.scss';

export default class PlayButton extends Component {

    state = {
        playIcon: require(`../../assets/player/play.svg`),
        pauseIcon: require(`../../assets/player/pause.svg`)
    };

    render() {
        return(
            <img className="cna-play_btn"
                 onClick={this.props.callback}
                 src={!this.props.isPlaying ? this.state.playIcon : this.state.pauseIcon}
                 alt="Play"/>
        )
    }
}
