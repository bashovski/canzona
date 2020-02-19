import React, {Component} from 'react';
import PlayButton from "../PlayButton";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './styles.scss';

export default class CurrentSong extends Component {

    state = {
        isPlaying: false,
        songDuration: 100,
        songTime: 0,
        draggingTimeout: null
    };

    // Refs are really necessary here since we are handling different audio playback events and bypassing the limits of html.
    timeSlider = React.createRef();
    audioRef = React.createRef();

    audioDidLoad = () => {
        this.setState({
            songDuration: this.audioRef.current.duration
        });
        console.log(this.audioRef.current.duration);
    };

    updateSongTime = (value) => {

        this.setState({
            songTime: value
        });
        this.audioRef.current.currentTime = value;

        if(this.state.isPlaying) {
            this.setState({
                isPlaying: false
            });
            this.audioRef.current.pause();
        }

        this.setState({
            draggingTimeout: setTimeout(() => {
                if(!this.timeSlider.current.state.dragging) {
                    clearTimeout(this.state.draggingTimeout);
                    this.setState({
                        isPlaying: true
                    });
                    this.audioRef.current.play();
                }
            }, 300)
        });
    };

    mutateAudioPlaying = () => {
        this.setState({
            isPlaying: !this.state.isPlaying
        });
        return !this.state.isPlaying ? this.audioRef.current.play() : this.audioRef.current.pause();
    };

    onSongTimeUpdate = () => {
        console.log(this.audioRef.current.currentTime);
        const time = this.audioRef.current.currentTime;
        this.setState({
            songTime: time
        });
        this.timeSlider.current.value = time;
    };

    getSongElapsedTime = () => {
        const mins = Math.floor(this.state.songTime / 60);
        const seconds = Math.ceil(this.state.songTime - (mins*60));

        return `${mins}:${seconds <= 9 ? '0' + seconds : seconds}`;
    };

    getSongDuration = () => {
        const mins = Math.floor(this.state.songDuration / 60);
        const seconds = Math.ceil(this.state.songDuration - (mins*60));

        return `${mins}:${seconds <= 9 ? '0' + seconds : seconds}`;
    };

    render() {

        const style = {
            rail: {
                backgroundColor: '#fff'
            },
            handle: {
                backgroundColor: '#6ec189'
            },
            track: {
                backgroundColor: '#6ec189'
            },
            slider: {
                margin: '0 20px',
                width: '80%'
            }
        };

        return(
            <div className="cna-current_song">
                <div className="cna-current_song-album_cover">
                    <img src={require(`../../assets/gojira_lenfantsauvage.jpg`)} alt=""/>
                </div>
                <div className="cna-current_song-info">
                    <div className="cna-current_song-info-name">
                        L'Enfant Sauvage
                    </div>
                    <div className="cna-current_song-info-artist">
                        Gojira
                    </div>
                </div>
                <div className="cna-current_song-player">
                    <audio id="music" preload="true" ref={this.audioRef} onLoadedData={this.audioDidLoad} onTimeUpdate={this.onSongTimeUpdate}>
                        <source src="https://canzona.s3.eu-central-1.amazonaws.com/public/gojira_lenfantsauvage.mp3" type="audio/ogg"/>
                        <source src="https://canzona.s3.eu-central-1.amazonaws.com/public/gojira_lenfantsauvage.mp3" type="audio/mpeg"/>
                    </audio>
                    <div className="cna-current_song-player-controls">
                        <div className="cna-current_song-player-controls-top">
                            <img className="cna-current_song-player-controls-top-btn" src={require(`../../assets/player/previous.svg`)} alt=""/>
                            <PlayButton isPlaying={this.state.isPlaying} callback={this.mutateAudioPlaying}/>
                            <img className="cna-current_song-player-controls-top-btn" src={require(`../../assets/player/next.svg`)} alt=""/>
                        </div>
                        <div className="cna-current_song-player-controls-bottom">
                            <div className="cna-current_song-player-controls-bottom-time">
                                {this.getSongElapsedTime()}
                            </div>
                            <Slider onChange={this.updateSongTime}
                                    ref={this.timeSlider}
                                    defaultValue={0}
                                    value={this.state.songTime}
                                    max={this.state.songDuration}
                                    style={style.slider}
                                    trackStyle={style.track}
                                    railStyle={style.rail}
                                    handleStyle={style.handle}/>
                            <div className="cna-current_song-player-controls-bottom-time">
                                {this.getSongDuration()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
