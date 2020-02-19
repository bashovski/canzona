import React, {Component} from 'react';
import './styles.scss';
import CurrentSong from '../../components/CurrentSong';

export default class WebPlayer extends Component {
    render() {
        return(
            <div className="cna-player">
                <div className="cna-player-wrapper">
                    Player
                </div>
                <CurrentSong/>
            </div>
        )
    }
}
