import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      plantData: [],
      hasUserTyped: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`http://harvesthelper.herokuapp.com/api/v1/plants/?api_key=${process.env.HARVEST_HELPER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          plantData: data
        });
      });
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value,
      hasUserTyped: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const allPlants = this.state.plantData;
    const { searchTerm } = this.state;
    let filteredPlants = allPlants.filter(plant => {
      return plant.name.includes(searchTerm);
    });
    if (!this.state.hasUserTyped || searchTerm === '') {
      filteredPlants = [];
    }
    return (
      <>
        <header className="title">
          <h2>
            Start Planting
        </h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="search-bar"
              value={this.state.value} onChange={this.handleChange} />
          </form>
        </header>
        <div className="list-container">
          <ul className="search-list">
            {
              filteredPlants.map(plant => (
                <li key={plant.id}>
                  <Suggestion plant={plant} />
                </li>
              ))
            }
          </ul>
        </div>
      </>
    );
  }
}

function Suggestion(props) {
  const { id, name } = props.plant;
  return (
    <a href={`#plants?plantId=${id}`} className="search-suggestions">
      {name}
    </a>
  );
}
