import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';
import Input from '../Input';
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
// import Loading from '../Loading/Loading';
import LoadingDots from '../LoadingDots/LoadingDots';

class MusicCard extends Component {
  constructor() {
    super();
    this.callAPIaddSong = this.callAPIaddSong.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputCheck: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    /**
    * Obtive ajuda das Pessoas Estudantes:
    *  Rolwane - Turma 17,
    *  [Ari] Aryeh Braid David - Turma 17,
    * para resolver essa parte. Me ajudaram a desenvolver o Raciocínio na Salinha de estudos 03.
    */
    const { dataAlbum: { trackId } } = this.props;

    getFavoriteSongs().then((response) => this.setState({
      isLoading: false,
    }, () => {
      if (response.some((el) => el.trackId === trackId)) {
        this.setState({
          inputCheck: true,
        });
      }
    }));
  }

  handleChange({ target }) {
    const { checked } = target;
    this.setState({
      inputCheck: checked,
    }, () => this.callAPIaddSong());
  }

  async callAPIaddSong() {
    const { dataAlbum } = this.props;
    this.setState({
      isLoading: true,
    });
    const response = await addSong(dataAlbum);
    console.log(response);
    this.setState({
      isLoading: false,
      // addMusic: response,
    });
  }

  render() {
    const { inputCheck, isLoading } = this.state;
    const { dataAlbum: { previewUrl, artist, trackName, trackId } } = this.props;
    return (
      <section className="track-container">
        {isLoading ? <LoadingDots style={ { fontSize: '64px' } } /> : (
          <>
            <p className="track-name">{trackName}</p>
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
              elementId={ trackId }
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
