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
    this.getFavoriteSongsAPI = this.getFavoriteSongsAPI.bind(this);

    this.state = {
      inputCheck: false,
      isLoading: true,
      addMusic: '',
      getMusic: '',
    };
  }

  componentDidMount() {
    const { dataAlbum: { trackId } } = this.props;
    // getFavoriteSongs().then((response) => this.setState({
    //   isLoading: false,
    // }, () => {
    //   if (response.some((el) => el.trackId === trackId)) {
    //     this.setState({
    //       inputCheck: true,
    //     });
    //   }
    // }));

    getFavoriteSongs().then((response) => {
      const validadteCheck = response.some((el) => el.trackId === trackId);
      this.setState({
        isLoading: false,
        inputCheck: validadteCheck,
      });
    });
  }

  handleChange({ target }) {
    const { checked } = target;
    this.setState({
      inputCheck: checked,
    }, () => this.callAPIaddSong());
  }

  async getFavoriteSongsAPI() {
    this.setState({
      isLoading: true,
    });

    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({
      isLoading: false,
      getMusic: response,
    });
  }

  async callAPIaddSong() {
    // this.setState({
    //   isLoading: true,
    // });
    const { dataAlbum } = this.props;
    const response = await addSong(dataAlbum);
    this.setState({
      isLoading: false,
      addMusic: response,
    });
  }

  render() {
    const { inputCheck, isLoading } = this.state;
    const { dataAlbum: { previewUrl, artist, track, trackId } } = this.props;
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
