import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div>
        <header data-testid="header-component">
          <span data-testid="header-user-name">
            {userName}
          </span>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
}.isRequire;

export default Header;
