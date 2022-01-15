import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { Link } from 'react-router-dom';
import userDefault from '../assets/default.png';
import logoTrybe from '../assets/logo-header.png';

class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="header">
        <header data-testid="header-component" className="header-container">
          <section className="header-content-container">
            <section className="logo-trybe-container">
              <img src={ logoTrybe } alt="logo-trybe" className="logo-trybe" />
            </section>
            <section className="user-name-container">
              <img src={ userDefault } alt="user-default" className="user-default" />
              <span data-testid="header-user-name" className="user">
                {userName}
              </span>
            </section>
          </section>
          <section className="link-container">
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </section>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
}.isRequire;

export default Header;
