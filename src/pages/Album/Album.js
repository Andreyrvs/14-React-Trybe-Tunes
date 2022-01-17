import React, { Component } from 'react';
import Header from '../../components/Header';

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
      albumLoading: false,
    });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      albumMusic: response,
      albumLoading: false,
    });
  }

  render() {
    const { albumMusic, userName, isLoading, albumLoading } = this.state;
    console.log(albumMusic);
    return (
      <div data-testid="page-album">
        {isLoading ? <Loading /> : (
          <>
            <Header userName={ userName } />
            {albumLoading ? <Loading /> : (
              <section className="album-description">
                {albumMusic.map((album, index) => (
                  index === 0
                    ? (
                      <section key={ album.collectionId }>
                        <p data-testid="album-name">{album.albumName}</p>
                        <p data-testid="artist-name">{album.artistName}</p>
                      </section>)
                    : (
                      <section>
                        <p>{album.trackName}</p>
                      </section>
                    )
                ))}
              </section>
            )}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
};

export default Album;
