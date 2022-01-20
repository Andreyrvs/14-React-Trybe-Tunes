import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { createUser } from '../../services/userAPI';
import './login.css';
// import Loading from '../../components/Loading/Loading';
import LoadingDots from '../../components/LoadingDots/LoadingDots';

const NAME_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      loginName: '',
      isBtnDisable: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.renderForm();
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.buttonDisable());
  }

  async callAPI(event) {
    event.preventDefault(event);
    this.setState({
      isLoading: true,
    });
    const { loginName } = this.state;
    await createUser({ name: loginName });
    this.setState({
      isLoading: false,
    }, this.changeRoute());
  }

  changeRoute() {
    const { history } = this.props;
    history.push('/search');
  }

  buttonDisable() {
    const { loginName } = this.state;
    const validateInput = loginName.length < NAME_LENGTH;

    this.setState({
      isBtnDisable: validateInput,
    });
  }

  renderForm() {
    const { isLoading, loginName, isBtnDisable } = this.state;

    return (
      <div data-testid="page-login" className="login-page">
        { isLoading ? <LoadingDots style={ { fontSize: '64px' } } /> : (
          <>
            <section className="logo-login" />
            <section className="card-container">
              <form
                onSubmit={ (event) => this.callAPI(event) }
                className="form-container"
              >
                <Input
                  datatest="login-name-input"
                  onInputChange={ this.handleChange }
                  elementClass="inputName"
                  name="loginName"
                  type="text"
                  value={ loginName }
                  placeHolder="Nome"
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
          </>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderForm()}</div>
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
