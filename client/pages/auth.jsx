import AuthForm from '../components/auth-form';
import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import AlertComponent from '../components/alert';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAlertOpen: false,
      alertStyling: {
        status: 'error',
        title: 'default',
        description: 'default'
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.alertDisplay = this.alertDisplay.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const action = this.context.route.path;
    fetch(`/api/auth/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        let alert;
        if (result.error) {
          alert = {
            status: 'error',
            title: 'Unsuccessful sign in attempt',
            description: `${result.error}`
          };
        } else {
          alert = {
            status: 'success',
            title: 'Your accunt has been created',
            description: 'Continue to sign in'
          };
        }
        this.setState({
          isAlertOpen: true,
          alertStyling: alert
        });
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          console.log('result: ', result);
          this.context.handleSignIn(result);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  alertDisplay() {
    if (this.state.isAlertOpen) {
      return '';
    }
    return 'none';
  }

  closeAlert() {
    this.setState({
      isAlertOpen: false
    });
  }

  render() {
    const { user, route } = this.context;
    if (user) return <Redirect to="" />;
    const alertStyling = this.state.alertStyling;
    return (
      <>
        <AuthForm
        key={route.path}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        close={this.closeAlert}
        buttonText='efsdfsfd'
        />
        <AlertComponent
          hide={this.alertDisplay}
          alertStyles={alertStyling}
          close={this.closeAlert}
        />
      < />
    );
  }
}

AuthPage.contextType = AppContext;
