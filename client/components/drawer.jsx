import React from 'react';

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
    const gardenId = 1;
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
              <a className="navigation-link" href={`#garden?gardenId=${gardenId}`}>
              <h2>My Garden</h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
