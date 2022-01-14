import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { type, text, elementId, datatest, value } = this.props;
    return (
      <div>
        <label htmlFor={ elementId }>
          <button
            data-testid={ datatest }
            disabled={ value }
            type={ type === 'button' ? 'button' : 'submit' }
            id={ elementId }
          >
            {text}
          </button>
        </label>
      </div>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  elementId: PropTypes.string,
  datatest: PropTypes.string,
}.isRequire;

export default Button;
