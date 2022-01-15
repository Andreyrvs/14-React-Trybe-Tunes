import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './css/search.css';

const NAME_LENGTH = 2;

class Search extends Component {
  constructor() {
    super();
    this.receiveAPI = this.receiveAPI.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.state = {
      userName: '',
      isLoading: false,
      isBtnDisable: true,
      searchArtist: '',
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
    const { searchArtist } = this.state;
    const validateInput = searchArtist.length < NAME_LENGTH;

    this.setState({
      isBtnDisable: validateInput,
    });
  }

  renderForm() {
    const { searchArtist, isBtnDisable } = this.state;
    return (
      <form>
        <Input
          datatest="search-artist-input"
          onInputChange={ this.handleChange }
          elementId="input-search-artist"
          name="searchArtist"
          type="text"
          value={ searchArtist }
          placeHolder="Nome do Artista"
        />
        <Button
          datatest="search-artist-button"
          text="Pesquisar"
          type="button"
          name="isBtnDisable"
          elementId="button-search-artist"
          value={ isBtnDisable }
          changeRoute={ this.handleChange }
        />
      </form>
    );
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <div data-testid="page-search" className="search-page">
        {isLoading ? <Loading /> : (
          <>
            <Header userName={ userName } />
            <div>
              {this.renderForm()}
            </div>
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
