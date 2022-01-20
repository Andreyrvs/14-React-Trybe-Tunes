import React, { Component } from 'react';
import './loadingDots.css';

class LoadingDots extends Component {
  render() {
    return (
      <section className="Body">
        <div style={ { fontSize: '0.5px' } }>
          Carregando...
        </div>
        <div className="Dots" />
        <div className="Dots" />
        <div className="Dots" />
        <div className="Dots" />
        <div className="Dots" />
      </section>
    );
  }
}

export default LoadingDots;
