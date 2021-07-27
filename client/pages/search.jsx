import React from 'react';
import {
  VStack,
  Heading,
  Input
} from '@chakra-ui/react';

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
    fetch(`https://harvesthelper.herokuapp.com/api/v1/plants/?api_key=${process.env.HARVEST_HELPER_API_KEY}`)
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
    let filteredPlants;
    if (searchTerm.length !== 0) {
      filteredPlants = allPlants.filter(plant => {
        return plant.name.includes(searchTerm[0].toUpperCase());
      });
    }
    if (searchTerm.length === 0) {
      filteredPlants = [];
    }
    return (
      <VStack>
            <Heading
            mt={10}
            mb={5}
            >
              Start Planting
            </Heading>
            <form onSubmit={this.handleSubmit}>
              <Input
              placeholder="search for a plant"
              width="60vw"
              bgColor="gray"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              />
            </form>
          <div>
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
      </VStack>
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
