import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { Link } from 'react-router-dom';
import userDefault from '../../assets/default.png';
import logoTrybe from '../../assets/logo-header.png';
import { getUser } from '../../services/userAPI';
// import Loading from '../Loading/Loading';
import LoadingDots from '../LoadingDots/LoadingDots';

class Header extends Component {
  constructor() {
    super();

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
    const { userName, isLoading } = this.state;
    return (
      <div className="header">
        {isLoading ? <LoadingDots /> : (

          <header data-testid="header-component" className="header-container">
            <section className="header-content-container">
              <section className="logo-trybe-container">
                <Link to="/">
                  <img src={ logoTrybe } alt="logo-trybe" className="logo-trybe" />
                </Link>
              </section>
              <section className="user-name-container">
                <img src={ userDefault } alt="user-default" className="user-default" />
                <span data-testid="header-user-name" className="user">
                  {userName}
                </span>
              </section>
            </section>
            <section className="link-container">
              <div className="link-search">
                <Link
                  to="/search"
                  data-testid="link-to-search"
                >
                  Search
                </Link>
              </div>
              <div className="link-favorites">
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favorites
                </Link>
              </div>
              <div className="link-profile">
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Profile
                </Link>
              </div>
            </section>
          </header>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
}.isRequire;

export default Header;
