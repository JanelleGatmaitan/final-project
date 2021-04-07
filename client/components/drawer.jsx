import React from 'react';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('bars clicked');
  }

  render() {
    return (
      <div className="drawer">
        <i className="fas fa-bars drawer-icon" onClick={this.handleClick}></i>
      </div>
    );
  }
}
