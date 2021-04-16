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
      <>
      <div className="tasks">
        <h3>Daily Tasks</h3>
        <div className="row">
            <i className="fas fa-tint"></i>
            <i className="fas fa-recycle"></i>
            <i className="fas fa-cut"></i>
        </div>
        <div className="row">
          <p className="task-Name">Water</p>
          <p className="task-Name">Compost</p>
          <p className="task-Name">Prune</p>
        </div>
      </div>
        <ul className="garden">
          {
            this.state.plantsInGarden.map(plant => (
              <li key={plant.plantId} className="listed-plant">
                <SavedPlant plant={plant} />
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}

function SavedPlant(props) {
  const { name, dateAdded, expectedHarvestDate } = props.plant;
  return (
    <div className="saved-plant-data">
      <div className="column">
        <img src={`/images/${name}.jpg`} className="list-img" alt="vegetable"></img>
      </div>
      <div className="text-column column">
        <p className="list-text">{name}</p>
        <p className="list-text">{`Date added: ${dateAdded}`}</p>
        <p className="list-text">{`Expected harvest: ${expectedHarvestDate}`}</p>
      </div>
      <div className="column">
        <i className="fas fa-times delete"></i>
      </div>
    </div>
  );
}
