import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './css/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const NAME_LENGTH = 2;

class Search extends Component {
  constructor() {
    super();
    this.receiveAPI = this.receiveAPI.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
    this.state = {
      userName: '',
      isLoading: false,
      searchLoading: false,
      isBtnDisable: true,
      searchArtist: [],
      inputValue: '',
      artistResult: '',
    };
  }

  componentDidMount() {
    this.receiveAPI();
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.buttonDisable());
  }

  async receiveAPI() {
    this.setState({
      isLoading: true,
    });
    const resolve = await getUser();
    this.setState({
      userName: resolve.name,
      isLoading: false,
    });
  }

  buttonDisable() {
    const { inputValue } = this.state;
    const validateInput = inputValue.length < NAME_LENGTH;

    this.setState({
      isBtnDisable: validateInput,
    });
  }

  async callAPI(event) {
    event.preventDefault(event);
    this.setState({
      searchLoading: true,
    });
    const { inputValue } = this.state;
    const resolve = await searchAlbumsAPI(inputValue);
    this.setState({
      searchLoading: false,
      searchArtist: resolve,
    }, () => this.renderForm());
    this.setState({
      inputValue: '',
      artistResult: inputValue,
    }, () => this.renderAlbums());
  }

  renderAlbums() {
    const { searchArtist, artistResult } = this.state;
    return (
      <>
        <h1>
          {`Resultado de álbuns de: ${artistResult}`}
        </h1>
        {searchArtist.map((artist) => (
          <section key={ artist.collectionId } className="card-album">
            <span>
              {artist.artistCollection}
            </span>
          </section>
        ))}
      </>
    );
  }

  renderForm() {
    const { inputValue, isBtnDisable } = this.state;
    return (
      <form onSubmit={ (event) => this.callAPI(event) }>
        <Input
          datatest="search-artist-input"
          onInputChange={ this.handleChange }
          elementId="input-search-artist"
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
          handleChange={ this.handleChange }
        />
      </form>
    );
  }

  render() {
    const { isLoading, userName, searchLoading } = this.state;
    return (
      <div data-testid="page-search" className="search-page">
        {isLoading ? <Loading /> : (
          <>
            <Header userName={ userName } />
            {searchLoading ? <Loading /> : (
              <section className="card-album-container">
                <div>
                  {this.renderForm()}
                </div>
                <div>
                  {this.renderAlbums()}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchArtist: PropTypes.string,
}.isRequire;

export default Search;
