import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './css/search.css';

class Search extends Component {
  constructor() {
    super();
    this.receiveAPI = this.receiveAPI.bind(this);
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.receiveAPI();
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

  render() {
    const { isLoading, userName } = this.state;
    return (
      <div data-testid="page-search" className="search-page">
        {isLoading ? <Loading /> : (
          <>
            <Header userName={ userName } />
            <div>
              <p>Rota Search</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Search;
