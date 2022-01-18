import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './loading.css';

class Loading extends Component {
  render() {
    const { style } = this.props;
    return (
      <div className="loader-container">
        <span style={ style } className="loader">Carregando...</span>
      </div>
    );
  }
}

Loading.propTypes = {
  style: PropTypes.object,
}.isRequire;

export default Loading;
