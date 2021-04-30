import React from 'react';

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
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      });
  }

  render() {
    return (
      <div className="auth-container">
        <h2 className="title">
          Start Planting
        </h2>
        <form className="auth-form">
          <label htmlFor="username" className="auth-form-label">
            Username
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={this.handleChange}
            className="auth-row auth-form-control" />
          <label htmlFor="password" className="auth-form-label">
            Password
          </label>
          <input
            required
            autoFocus
            id="password"
            type="text"
            name="password"
            onChange={this.handleChange}
            className="auth-row auth-form-control" />
          <div className="auth-btn-container">
            <button type="submit" className="auth-btn" onClick={this.handleSubmit}>
              Sign Up
          </button>
          </div>
      </form>
      </div>
    );
  }
}
