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
    console.log('bars clicked');
    this.setState({
      menuOpen: true
    });
  }

  getMenuClass() {
    if (this.state.menuOpen) {
      return 'shade';
    }
    return 'hidden';
  }

  render() {
    return (
      <div className="drawer">
        <i className="fas fa-bars drawer-icon" onClick={this.handleClick}></i>
        <div className={this.getMenuClass()}>
          <p>werwerrwer</p>
        </div>
      </div>
    );
  }
}
