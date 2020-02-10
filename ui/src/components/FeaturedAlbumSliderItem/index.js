import React from "react";
import './styles.scss';

export default class FeaturedAlbumSliderItem extends React.Component {

    render() {
        const style = {
            backgroundImage: `url(${require(`../../assets/${this.props.thumbnail}`)})`
        };
        return(
            <div className="cna-featured_album_slider-item" style={style}>
                <div className="cna-featured_album_slider-item-overlay">
                    <div className="cna-featured_album_slider-item-overlay-name">
                        {this.props.album}
                    </div>
                    <div className="cna-featured_album_slider-item-overlay-artist">
                        {this.props.artist}
                    </div>
                    <div className="cna-featured_album_slider-item-overlay-play_now">
                        <img src={require('../../assets/icons/play.svg')} alt=""/>
                        <span>Play Now</span>
                    </div>
                </div>
            </div>
        );
    }
}
