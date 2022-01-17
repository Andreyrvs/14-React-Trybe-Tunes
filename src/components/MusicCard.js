import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { previewUrl, artist, track } = this.props;
    return (
      <div>
        <p data-testid="artist-name">{track}</p>
        <audio key={ artist } data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

export default MusicCard;
