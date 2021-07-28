import React from 'react';
import AppContext from '../lib/app-context';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack
} from '@chakra-ui/react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const { action } = this.props;
    fetch(`/api/auth/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    let submitBtnText = 'Sign Up';
    if (action === 'sign-in') {
      submitBtnText = 'Sign In';
    }
    return (
      <VStack
      maxW="60vw"
      margin="auto"
      >
        <FormControl id="username" mb="25px">
          <FormLabel>Username</FormLabel>
          <Input
          name="username"
          isRequired={true}
          type="text"
          onChange={this.handleChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
          type="password"
          name="password"
          onChange={this.handleChange}
          />
        </FormControl>
        <Button
          type="submit"
          my="15px"
          bgColor="green"
          color="white"
          onClick={this.handleSubmit}
        >
          {submitBtnText}
        </Button>
      </VStack>
    );
    // return (
    //   <div className="auth-container">
    //     <form className="auth-form">
    //       <label htmlFor="username" className="auth-form-label">
    //         Username
    //       </label>
    //       <input
    //         required
    //         autoFocus
    //         id="username"
    //         type="text"
    //         name="username"
    // onChange={this.handleChange}
    //         className="auth-row auth-form-control" />
    //       <label htmlFor="password" className="auth-form-label">
    //         Password
    //       </label>
    //       <input
    //         required
    //         autoFocus
    //         id="password"
    //         type="password"
    //         name="password"
    //         onChange={this.handleChange}
    //         className="auth-row auth-form-control" />
    //       <div className="auth-btn-container">
    //         <button type="submit" className="auth-btn" onClick={this.handleSubmit}>
    //           {submitBtnText}
    //       </button>
    //       </div>
    //   </form>
    //   </div>
    // );
  }
}

AuthForm.contextType = AppContext;
