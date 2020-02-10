import React from "react";
import FeaturedAlbumSliderItem from "../FeaturedAlbumSliderItem";
import './styles.scss';

export default class FeaturedAlbumSlider extends React.Component {
    render() {
        return(
            <div className="cna-featured_album_slider">
                <FeaturedAlbumSliderItem album={`L' Enfant Sauvage`} artist={`Gojira`} thumbnail={`gojira_lenfantsauvage.jpg`}/>
                <FeaturedAlbumSliderItem album={`Cold Fact`} artist={`Rodriguez`} thumbnail={`sixto.jpg`}/>
                <FeaturedAlbumSliderItem album={`Rust in Piece`} artist={`Megadeth`} thumbnail={`rustinpiece.jpg`}/>
                <FeaturedAlbumSliderItem album={`Mudvayne`} artist={`Mudvayne`} thumbnail={`mudvayne.jpg`}/>
                <FeaturedAlbumSliderItem album={`Facelift`} artist={`Alice in Chains`} thumbnail={`facelift.jpg`}/>
                <FeaturedAlbumSliderItem album={`Scars on Broadway`} artist={`Daron Malakian & Scars on Broadway`} thumbnail={`sob.jpg`}/>
            </div>
        );
    }
}
