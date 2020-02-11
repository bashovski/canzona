import React from 'react';
import FeaturedAlbumSlider from "../../components/FeaturedAlbumsSlider";
import Button from "../../components/Button";
import './styles.scss';

export default class Home extends React.Component {
    render() {
        return (
            <div className="cna-home">
                <div className="cna-home-main">
                    <h2>Featured on <span>Canzona</span></h2>
                    <p>See what's trending on the platform at the moment.</p>
                    <FeaturedAlbumSlider/>
                </div>
                <div className="cna-home-info">

                </div>
            </div>
        );
    }
}
