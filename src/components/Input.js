import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { datatest, elementId, onInputChange, type, value, name } = this.props;
    return (
      <div>
        <label htmlFor={ elementId }>
          <input
            data-testid={ datatest }
            className={ elementId }
            type={ type }
            value={ value }
            name={ name }
            placeholder="Nome"
            onChange={ onInputChange }
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
