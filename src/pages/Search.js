import React, { Component } from 'react';
import Loading from '../components/Loading';

class Search extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     isLoading: false,
  //   };
  // }

  render() {
    const { isLoading } = this.props;
    return (
      <div data-testid="page-search">
        { isLoading ? <Loading /> : (
          <div>

            <p>Rota Search</p>
            <p>Rota Search</p>
            <p>Rota Search</p>
            <p>Rota Search</p>
            <p>Rota Search</p>
            <p>Rota Search</p>
            <p>Rota Search</p>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
