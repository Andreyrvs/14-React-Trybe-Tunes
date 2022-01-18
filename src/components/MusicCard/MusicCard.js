import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';
import Input from '../Input';

class MusicCard extends Component {
  render() {
    const { previewUrl, artist, track, trackId, onInputChange } = this.props;
    return (
      <section>
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
          onInputChange={ onInputChange }
          // value={ favoriteSong }
          name="favoriteSong"
        />
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
