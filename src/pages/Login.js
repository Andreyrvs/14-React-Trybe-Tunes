import React, { Component } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <Input
            datatest="login-name-input"
            elementId="input-login-name"
            type="text"
          />
          <Button
            datatest="login-submit-button"
            handleInputChange={ this.handleInputChange }
            text="Entrar"
            type="button"
            elementId="button-login-submit"
          />
        </form>
      </div>
    );
  }
}

export default Login;
