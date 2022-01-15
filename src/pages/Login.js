import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';
import { createUser } from '../services/userAPI';
import './css/login.css';

const NAME_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
    this.callAPI = this.callAPI.bind(this);
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

  async callAPI() {
    const { loginName } = this.state;
    await createUser({ name: loginName });
  }

  changeRoute(event) {
    event.preventDefault(event);
    const { history } = this.props;
    history.push('/search');
  }

  buttonDisable() {
    const { loginName } = this.state;
    const validateInput = loginName.length < NAME_LENGTH;

    this.setState({
      isBtnDisable: validateInput,
    }, () => this.callAPI());
  }

  render() {
    const { loginName, isBtnDisable } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        <section className="logo" />
        <section className="card-container">
          <form
            onSubmit={ (event) => this.changeRoute(event) }
            className="form-container"
          >
            <Input
              datatest="login-name-input"
              onInputChange={ this.handleChange }
              elementId="inputName"
              name="loginName"
              type="text"
              value={ loginName }
            />
            <Button
              datatest="login-submit-button"
              text="Entrar"
              type="submit"
              name="isBtnDisable"
              elementId="buttonSubmit"
              value={ isBtnDisable }
              changeRoute={ this.handleChange }
            />
          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  isBtnDisable: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequire;

export default Login;
