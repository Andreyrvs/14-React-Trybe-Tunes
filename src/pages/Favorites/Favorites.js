import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './favorites.css';

class Favorites extends Component {
  render() {
    return (
      <section data-testid="page-favorites" className="favorites-page">
        <Header />
      </section>
    );
  }
}

export default Favorites;
