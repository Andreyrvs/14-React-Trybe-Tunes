import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import Input from '../../components/Input';
// import Loading from '../../components/Loading/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumNotFound from '../../components/AlbumNotFound';
import './search.css';
import LoadingDots from '../../components/LoadingDots/LoadingDots';

const NAME_LENGTH = 2;

class Search extends Component {
  constructor() {
    super();
    this.renderForm = this.renderForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.callAPIsearchAlbums = this.callAPIsearchAlbums.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
    this.state = {
      searchLoading: false,
      isBtnDisable: true,
      searchArtist: [],
      inputValue: '',
      artistResult: '',
    };
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.buttonDisable());
  }

  buttonDisable() {
    const { inputValue } = this.state;
    const validateInput = inputValue.length < NAME_LENGTH;

    this.setState({
      isBtnDisable: validateInput,
    });
  }

  async callAPIsearchAlbums(event) {
    event.preventDefault(event);
    this.setState({
      searchLoading: true,
      inputValue: '',
      isBtnDisable: true,
    });
    const { inputValue } = this.state;
    const resolve = await searchAlbumsAPI(inputValue);
    this.setState({
      searchLoading: false,
      artistResult: inputValue,
      searchArtist: resolve,
    });
  }

  renderAlbums() {
    const { artistResult, searchArtist } = this.state;
    return (
      <>
        <section className="album-h1">
          <h1>
            {`Resultado de álbuns de: ${artistResult}`}
          </h1>
        </section>
        <section className="card-album-container">
          {searchArtist.map((artist) => (
            <section key={ artist.collectionId } className="card-album">
              <Link
                to={ `/album/${artist.collectionId}` }
                data-testid={ `link-to-album-${artist.collectionId}` }
              >
                <img
                  className="album-image"
                  src={ artist.artworkUrl100 }
                  alt={ artist.artistName }
                />
              </Link>

              <span>
                {artist.collectionName}
              </span>
              <span>
                {artist.artistName}
              </span>
            </section>
          ))}
        </section>
      </>
    );
  }

  renderForm() {
    const { inputValue, isBtnDisable } = this.state;
    return (
      <form onSubmit={ (event) => this.callAPIsearchAlbums(event) }>
        <section className="input-btn-container">
          <Input
            datatest="search-artist-input"
            onInputChange={ this.handleChange }
            elementClass="input-search-artist"
            name="inputValue"
            type="text"
            value={ inputValue }
            placeHolder="Nome do Artista"
          />
          <Button
            datatest="search-artist-button"
            text="Pesquisar"
            type="submit"
            name="isBtnDisable"
            elementId="button-search-artist"
            value={ isBtnDisable }
            handleChange={ this.renderAlbums }
          />
        </section>
      </form>
    );
  }

  render() {
    const { searchLoading, searchArtist, artistResult } = this.state;
    const albumNotFound = searchArtist.length === 0 && artistResult;
    return (
      <section data-testid="page-search" className="search-page">
        <Header />
        {(searchLoading) ? <LoadingDots style={ { fontSize: '64px' } } /> : (
          <section className="search-container">
            <section className="form-album-container">
              {this.renderForm()}
            </section>
            <section className="render-albums">
              { albumNotFound
                ? <AlbumNotFound /> : (
                  this.renderAlbums()
                )}
            </section>
          </section>
        )}
      </section>
    );
  }
}

export default Search;
