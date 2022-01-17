import React, { Component } from 'react';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
// import Loading from '../../components/Loading';
import getMusics from '../../services/musicsAPI';
import './album.css';

class Album extends Component {
  constructor() {
    super();
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      albumMusic: [],
      // isLoading: false,
      // albumLoading: false,
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  async callAPI() {
    // this.setState({
    //   albumLoading: true,
    // });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    console.log(response);
    this.setState({
      albumMusic: response,
      // albumLoading: false,
    });
  }

  render() {
    const { albumMusic, userName } = this.state;
    return (
      <div data-testid="page-album" className="album-page">
        <Header userName={ userName } />
        <section className="album-description">
          {albumMusic.map((artist) => (
            artist.wrapperType === 'collection' ? (
              <section key={ artist.amgArtistId } className="artist-container">
                <p data-testid="album-name">{artist.collectionName}</p>
                <p data-testid="artist-name">{artist.artistName}</p>
              </section>
            ) : (
              <section key={ artist.amgArtistId } className="track-container">
                <p>{artist.trackName}</p>
                <MusicCard previewUrl={ artist.previewUrl } />
              </section>

            )
          ))}
        </section>
      </div>
    );
  }
}

export default Album;
