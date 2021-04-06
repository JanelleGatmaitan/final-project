import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { keyword, value } = event.target;
    this.setState(
      { [keyword]: value }
    );
  }

  render() {
    return (
      <>
        <header className="text-center">
          <h2 className="mb-2">
            Start Planting
        </h2>
          <input type="text" className="search-bar" placeholder="ex. Kale"></input>
        </header>
        <ul className="search-suggestions text-left">fgdfg</ul>
      </>
    );
  }
}
