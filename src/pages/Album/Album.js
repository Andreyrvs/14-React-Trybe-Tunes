import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
// import Loading from '../../components/Loading';
import getMusics from '../../services/musicsAPI';
import './album.css';

class Album extends Component {
  constructor() {
    super();
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      albumMusic: [],
      isLoading: false,
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
    const { albumMusic, userName } = this.state;
    return (
      <div data-testid="page-album" className="album-page">
        <Header userName={ userName } />
        <section className="album-description">
          {albumMusic.map((album, index) => (

            <section key={ album.collectionId }>
              <p data-testid="album-name">{album.albumName}</p>
              <p data-testid="artist-name">{album.artistName}</p>
            </section>))}
        </section>
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
};

export default Album;
