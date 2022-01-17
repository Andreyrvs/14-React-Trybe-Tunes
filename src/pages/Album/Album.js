import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import Loading from '../../components/Loading';
import getMusics from '../../services/musicsAPI';
import './album.css';

class Album extends Component {
  constructor() {
    super();
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      albumMusic: [],
      // isLoading: false,
      albumLoading: false,
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  async callAPI() {
    this.setState({
      albumLoading: true,
    });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    console.log(response);
    this.setState({
      albumMusic: response,
      albumLoading: false,
    });
  }

  render() {
    const { albumMusic, userName, albumLoading } = this.state;
    return (
      <div className="album-page" data-testid="page-album">
        <Header userName={ userName } />
        {albumLoading ? <Loading /> : (
          <section className="album-description">
            {albumMusic.map((artist, index) => (
              index === 0 ? (
                <section key={ artist.collectionId } className="artist-container">
                  <img
                    src={ artist.artworkUrl100 }
                    alt={ artist.artistName }
                    height="290px"
                    width="290px"
                  />
                  <p
                    className="album-name"
                    data-testid="album-name"
                  >
                    {artist.collectionName}
                  </p>
                  <p
                    className="artist-name"
                    data-testid="artist-name"
                  >
                    {artist.artistName}
                  </p>
                </section>
              ) : (
                <>
                  <hr />
                  <section key={ artist.trackId } className="track-container">
                    <MusicCard
                      previewUrl={ artist.previewUrl }
                      artist={ artist.collectionId }
                      track={ artist.trackName }
                    />
                  </section>
                </>
              )
            ))}
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequire;

export default Album;
