import React, { Component } from 'react';
import './loadingDots.css';

class LoadingDots extends Component {
  render() {
    return (
      <section className="Body">
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
