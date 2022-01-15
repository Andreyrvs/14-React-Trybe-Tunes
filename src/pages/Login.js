import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';
// import { createUser } from '../services/userAPI';
import './login.css';

const NAME_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      loginName: '',
      isBtnDisable: true,
    };
  }

  // componentDidUpdate() {
  //   this.handleClick();
  // }

  handleChange({ target }) {
    const { name, value, type, checked } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.buttonDisable());
  }

  // async handleClick() {
  //   const { loginName } = this.state;
  //   const {history } =
  //   await createUser({ nome: loginName });
  // }

  buttonDisable() {
    const { loginName } = this.state;
    const validateInput = loginName.length <= NAME_LENGTH;

    this.setState({
      isBtnDisable: validateInput,
    });
  }

  render() {
    const { loginName, isBtnDisable } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        <section className="card-container">
          <form className="form-container">
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
              handleClick={ this.handleClick }
            />
          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  isBtnDisable: PropTypes.bool,
}.isRequire;

export default Login;
