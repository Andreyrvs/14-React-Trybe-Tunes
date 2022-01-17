import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';

class MusicCard extends Component {
  render() {
    const { previewUrl, artist, track } = this.props;
    return (
      <>
        <p className="track-name">{track}</p>
        <audio key={ artist } data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  artist: PropTypes.string,
  track: PropTypes.string,
}.isRequire;

export default MusicCard;
