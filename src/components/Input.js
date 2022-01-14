import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { datatest, elementId, type, value } = this.props;
    return (
      <div>
        <label htmlFor={ elementId }>
          <input
            data-testid={ datatest }
            id={ elementId }
            type={ type }
            value={ value }
            placeholder="Nome"
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  datatest: PropTypes.string,
  elementId: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequire;

export default Input;
