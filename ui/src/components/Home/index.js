import React, {Component} from 'react';
import FeaturedAlbumSlider from "../FeaturedAlbumsSlider";
import './styles.scss';

export default class Home extends Component {
    render() {
        return(
            <div className="cna-player-home">
                <div className="cna-player-home-for_you">
                    <div className="cna-player-home-for_you-heading">
                        <span>Recently</span> played
                    </div>
                    <FeaturedAlbumSlider/>
                </div>
            </div>
        )
    }
}
