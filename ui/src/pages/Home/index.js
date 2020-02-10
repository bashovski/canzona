import React from 'react';
import FeaturedAlbumSlider from "../../components/FeaturedAlbumsSlider";
import './styles.scss';

export default class Home extends React.Component {
    render() {
        return (
            <div className="cna-home">
                <div className="cna-home-main">

                    <FeaturedAlbumSlider/>
                </div>
            </div>
        );
    }
}
