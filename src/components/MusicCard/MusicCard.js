import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';
import Input from '../Input';
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.callAPIaddSong = this.callAPIaddSong.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.receivedAPIgetFavoriteSongs = this.receivedAPIgetFavoriteSongs.bind(this);

    this.state = {
      inputCheck: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.receivedAPIgetFavoriteSongs();
  }

  handleChange({ target }) {
    const { checked } = target;
    this.setState({
      inputCheck: checked,
    }, () => this.callAPIaddSong());
  }

  async callAPIaddSong() {
    this.setState({
      isLoading: true,
    });
    const response = await addSong();
    console.log(response);
    this.setState({
      isLoading: false,
    });
  }

  async receivedAPIgetFavoriteSongs() {
    const response = await getFavoriteSongs();
  }

  render() {
    const { inputCheck, isLoading } = this.state;
    const { previewUrl, artist, track, trackId } = this.props;
    return (
      <section className="track-container">
        {isLoading ? <Loading style={ { fontSize: '64px' } } /> : (
          <>
            <p className="track-name">{track}</p>
            <audio
              key={ artist }
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <Input
              type="checkbox"
              label="Favorita"
              datatest={ `checkbox-music-${trackId}` }
              onInputChange={ this.handleChange }
              inputCheck={ inputCheck }
              name="inputCheck"
              elementId="music-checkbox"
            />
          </>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  artist: PropTypes.string,
  track: PropTypes.string,
}.isRequire;

export default MusicCard;
