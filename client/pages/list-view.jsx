import React from 'react';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardenId: this.props.gardenId,
      plantsInGarden: []
    };
  }

  componentDidMount() {
    fetch('/api/plantsInGarden')
      .then(res => res.json())
      .then(data => {
        this.setState({
          plantsInGarden: data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <ul className="garden">
        {
          this.state.plantsInGarden.map(plant => (
            <li key={plant.id}>
              <SavedPlant plant={plant} />
            </li>
          ))
        }
      </ul>
    );
  }
}

function SavedPlant(props) {
  return (
    <div className="saved-plant">
      <div className="column">
        <img src="/images/tomatoes.jpg" className="list-img" alt="vegetable"></img>
      </div>
      <div className="text-column column">
        <p className="list-text">Tomatoes</p>
        <p className="list-text">Date</p>
        <p className="list-text">Expected harvest</p>
      </div>
      <div className="column">
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}
