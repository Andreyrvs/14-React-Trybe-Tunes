import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard/MusicCard';
// import Loading from '../../components/Loading/Loading';
import getMusics from '../../services/musicsAPI';
import './album.css';
import LoadingDots from '../../components/LoadingDots/LoadingDots';

class Album extends Component {
  constructor() {
    super();
    this.callAPIgetMusics = this.callAPIgetMusics.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);

    this.state = {
      albumMusic: [],
      albumLoading: false,
    };
  }

  componentDidMount() {
    this.callAPIgetMusics();
  }

  async callAPIgetMusics() {
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

  renderAlbum() {
    const { albumMusic } = this.state;
    return (
      <section className="album-container">
        <section className="album-music">
          {albumMusic.map((artist, index) => (
            index === 0 && (

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
            )
          ))}
        </section>
        <section>
          { albumMusic.map((music, index) => (
            index !== 0 && (
              <>
                <hr />
                <MusicCard
                  key={ music.trackId }
                  dataAlbum={ music }
                />
              </>
            )
          ))}
        </section>
      </section>
    );
  }

  render() {
    const { userName, albumLoading } = this.state;
    return (
      <div className="album-page" data-testid="page-album">
        <Header userName={ userName } />
        {albumLoading ? <LoadingDots style={ { fontSize: '64px' } } /> : (
          this.renderAlbum()
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
