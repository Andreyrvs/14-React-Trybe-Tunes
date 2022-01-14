import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';

const NAME_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.state = {
      loginName: '',
      isBtnDisable: true,
    };
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.buttonDisable());
  }

  buttonDisable() {
    const { loginName } = this.state;

    if (loginName.length >= NAME_LENGTH) {
      this.setState({
        isBtnDisable: false,
      });
    } else {
      this.setState({
        isBtnDisable: true,
      });
    }
  }

  render() {
    const { loginName, isBtnDisable } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <Input
            datatest="login-name-input"
            onInputChange={ this.handleChange }
            elementId="input-login-name"
            name="loginName"
            type="text"
            value={ loginName }
          />
          <Button
            datatest="login-submit-button"
            text="Entrar"
            type="button"
            name="isBtnDisable"
            elementId="button-login-submit"
            value={ isBtnDisable }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isBtnDisable: PropTypes.bool,
}.isRequire;

export default Login;
