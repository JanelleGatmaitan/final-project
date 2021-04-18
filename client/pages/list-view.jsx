import React from 'react';
import GardenForm from '../components/garden-form';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardenId: this.props.gardenId,
      plantsInGarden: [],
      tasksCompleted: {
        Water: null,
        Compost: null,
        Prune: null
      },
      gardenInfo: {
        soil: '',
        sun: '',
        size: '',
        notes: ''
      }
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    fetch('/api/plantsInGarden')
      .then(res => res.json())
      .then(plantData => {
        this.setState({
          plantsInGarden: plantData
        });
      })
      .catch(err => console.error(err));
    fetch(`api/tasksCompleted/${this.props.gardenId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasksCompleted: data
        });
      })
      .catch(err => console.error(err));
    fetch('/api/gardenStats')
      .then(res => res.json())
      .then(gardenInfo => {
        this.setState({
          gardenInfo: gardenInfo[0]
        });
      })
      .catch(err => console.error(err));

  }

  onClick(event) {
    const taskName = event.target.innerText;
    const previousStatus = this.state.tasksCompleted[taskName];
    const tasksCompletedCopy = Object.assign({}, this.state.tasksCompleted);
    tasksCompletedCopy[taskName] = !previousStatus;
    this.setState({
      tasksCompleted: tasksCompletedCopy
    });
    fetch(`/api/tasksCompleted/${this.props.gardenId}`, {
      method: 'PUT',
      body: JSON.stringify(tasksCompletedCopy),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.error(err));
  }

  getWaterClass() {
    if (this.state.tasksCompleted.Water) {
      return 'task-completed';
    }
    return 'task-incomplete';
  }

  getCompostClass() {
    if (this.state.tasksCompleted.Compost) {
      return 'task-completed';
    }
    return 'task-incomplete';
  }

  getPruneClass() {
    if (this.state.tasksCompleted.Prune) {
      return 'task-completed';
    }
    return 'task-incomplete';
  }

  getGardenFormClass() {
    return 'asdasda';
  }

  handleChange(event) {
    const gardenCopy = Object.assign({}, this.state.gardenInfo);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    gardenCopy[name] = value;
    this.setState({
      gardenInfo: gardenCopy
    });
  }

  handleSave(event) {
    event.preventDefault();
    fetch(`/api/gardenStats/${this.props.gardenId}`, {
      method: 'PUT',
      body: JSON.stringify(this.state.gardenInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.gardenInfo) return null;
    return (
      <>
        <GardenForm position="garden-form-center" title="My Garden" className={this.getGardenFormClass()} onSave={this.handleSave}
        values={this.state.gardenInfo} handleChange={this.handleChange} />
      <div className="tasks">
        <h3 className="tasks-title">Daily Tasks</h3>
        <div className="row task-icons">
            <i className="fas fa-tint task-icon"></i>
            <i className="fas fa-recycle task-icon"></i>
            <i className="fas fa-cut task-icon"></i>
        </div>
        <div className="row task-names">
          <p className={this.getWaterClass()} onClick={this.onClick}>Water</p>
          <p className={this.getCompostClass()} onClick={this.onClick}>Compost</p>
          <p className={this.getPruneClass()} onClick={this.onClick}>Prune</p>
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
  const { name, dateAdded, expectedHarvestDate, plantId } = props.plant;
  return (
    <div className="saved-plant-data">
      <div className="column">
        <a href={`#plants?plantId=${plantId}`}>
          <img src={`/images/${name.toLowerCase()}.jpg`} className="list-img" alt="vegetable"></img>
        </a>
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
