import React from 'react';
// import getAllVegetables from '../../server/harvest-helper';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value });
    console.log('this.state: ', this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('this.state:', this.state);
  }

  render() {
    return (
      <>
        <header className="text-center title">
          <h2 className="mb-2">
            Start Planting
        </h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="search-bar"
              value={this.state.value} onChange={this.handleChange} />
            <ul className="search-suggestions text-left">suggestions</ul>
          </form>
        </header>
      </>
    );
  }
}
