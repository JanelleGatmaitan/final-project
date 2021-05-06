import React from 'react';
import AppContext from '../lib/app-context';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.getMenuClass = this.getMenuClass.bind(this);
  }

  handleClick() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  getMenuClass() {
    if (this.state.menuOpen) {
      return 'shade';
    }
    return 'hidden';
  }

  render() {
    const { user } = this.context;
    let navigationItem1 = 'Register';
    let navLink1 = '#sign-up';
    let navigationItem2 = 'Sign In';
    let navLink2 = '#sign-in';
    if (user) {
      navigationItem1 = 'My Garden';
      navLink1 = `#garden?gardenId=${this.context.gardenId}`;
      navigationItem2 = 'Sign Out';
      navLink2 = '#';
    }
    return (
      <div className="drawer">
        <i className="fas fa-bars drawer-icon" onClick={this.handleClick}></i>
        <div className={this.getMenuClass()} onClick={this.handleClick}>
          <div className="menu">
            <div className="navigation-links-container">
              <h2>Menu</h2>
              <a className ="navigation-link" href='#'>
                <h2 onClick={this.handleClick}>Search</h2>
              </a>
              <a className="navigation-link" href={navLink1}>
              <h2>{navigationItem1}</h2>
              </a>
              <a className="navigation-link" href={navLink2} onClick={this.context.handleSignOut}>
                <h2>{navigationItem2}</h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Drawer.contextType = AppContext;
