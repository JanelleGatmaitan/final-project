import AuthForm from '../components/auth-form';
import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import AlertComponent from '../components/alert';
import { Heading } from '@chakra-ui/react';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
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
    this.getText = this.getText.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    let alert;
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
        console.log('res: ', res);
        return res.json();
      })
      .then(result => {
        console.log('result: ', result);
        if (result.error) {
          alert = {
            status: 'error',
            title: `Unsuccessful ${action} attempt`,
            description: `${result.error}`
          };
          this.setState({
            isAlertOpen: true,
            alertStyling: alert
          });
        } else {
          alert = {
            status: 'success',
            title: 'Your account has been created',
            description: 'Continue to sign in'
          };
          this.setState({
            isAlertOpen: true,
            alertStyling: alert
          });
        }
        if (result.user && result.token) {
          this.context.handleSignIn(result);
        }
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({
      username: '',
      password: ''
    });
  }

  alertDisplay() {
    if (this.state.isAlertOpen) {
      setTimeout(() => this.closeAlert(), 3000);
      return '';
    }
    return 'none';
  }

  closeAlert() {
    this.setState({
      isAlertOpen: false
    });
  }

  getText() {
    if (this.context.route.path === 'sign-in') return 'Sign In';
    return 'Sign Up';
  }

  render() {
    const { user, route } = this.context;
    if (user) return <Redirect to="" />;
    const alertStyling = this.state.alertStyling;
    const text = this.getText();
    return (
      <>
        <Heading
          textAlign='center'
          m='50px'
        >
          {text}
        </Heading>
        <AuthForm
        key={route.path}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        close={this.closeAlert}
        text={text}
        usernameValue={this.state.username}
        passwordValue={this.state.password}
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
