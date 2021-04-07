import React from 'react';
import getAllVegetables from '../../server/harvest-helper';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      plantData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('http://harvesthelper.herokuapp.com/api/v1/plants/?api_key=349d9448a25ad42ce213e1018c428cd3')
      .then(res => res.json())
      .then(data => {
        this.setState({
          plantData: data
        });
      });
    console.log('compDidMount');
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
    console.log('this.state: ', this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('this.state:', this.state);
  }

  render() {
    const allPlants = this.state.plantData;
    const searchTerm = this.state.searchTerm;
    const filteredPlants = allPlants.filter(plant => {
      return plant.name.includes(searchTerm);
    });
    console.log('filteredPlants: ', filteredPlants);
    return (
      <>
        <header className="text-center title">
          <h2 className="mb-2">
            Start Planting
        </h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="search-bar"
              value={this.state.value} onChange={this.handleChange} />
            <ul className="search-suggestions text-left">
              <a href='#plants?plantId='>
                suggestion
              </a>
            </ul>
          </form>
        </header>
      </>
    );
  }
}

// function Suggestion(props) {
//   const plantId =
// }
