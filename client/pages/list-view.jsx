import React from 'react';
import GardenForm from '../components/garden-form';
import DeleteConfirmation from '../components/delete-confirmation';

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
      },
      isDeleteModalOpen: false,
      toDeleteId: null,
      hasBeenDeleted: false
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.cancelRemoval = this.cancelRemoval.bind(this);
    this.clickDeleteBtn = this.clickDeleteBtn.bind(this);
    this.getTaskClass = this.getTaskClass.bind(this);
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
    console.log('event.target', event.target);
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
    this.getTaskClass(taskName, event.target);
  }

  getTaskClass(taskName, target) {
    console.log(this.state.tasksCompleted);
    if (this.state.tasksCompleted[taskName]) {
      target.className = 'task-complete';
    }
    target.className = 'task-incomplete';
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

  clickDeleteBtn(event) {
    this.setState({
      isDeleteModalOpen: true,
      toDeleteId: event.target.getAttribute('plantid')
    });
  }

  getDeleteModalClass() {
    if (this.state.isDeleteModalOpen) {
      return 'shade';
    }
    return 'hidden';
  }

  cancelRemoval() {
    this.setState({
      isDeleteModalOpen: false
    });
  }

  handleRemove() {
    const deletedPlantId = this.state.toDeleteId;
    const deletedPlant = document.querySelector(`li.listed-plant[plantid='${deletedPlantId}']`);
    deletedPlant.className = 'hidden';
    fetch(`/api/plantsInGarden/${deletedPlantId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState({
          isDeleteModalOpen: false,
          hasBeenDeleted: true
        });
      }
      )
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.gardenInfo) return null;
    return (
      <>
        <DeleteConfirmation className={this.getDeleteModalClass()} clickYes={this.handleRemove} clickNo={this.cancelRemoval} />
        <GardenForm position="garden-form-center" title="My Garden" onSave={this.handleSave}
        values={this.state.gardenInfo} handleChange={this.handleChange} />
      <div className="tasks">
        <h4 className="tasks-title">Daily Tasks</h4>
        <div className="row task-icons">
            <i className="fas fa-tint task-icon"></i>
            <i className="fas fa-recycle task-icon"></i>
            <i className="fas fa-cut task-icon"></i>
        </div>
        <div className="row task-names">
          <p className="task-name" onClick={this.onClick}>Water</p>
          <p className={`task-name ${this.getCompostClass()}`} onClick={this.onClick}>Compost</p>
          <p className={`task-name ${this.getPruneClass()}`} onClick={this.onClick}>Prune</p>
        </div>
      </div>
        <ul className="garden">
          {
            this.state.plantsInGarden.map(plant => (
              <li key={plant.plantId} className="listed-plant" plantid={plant.plantId} onClick={this.clickDeleteBtn}>
                <SavedPlant plant={plant}/>
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
      <div className="text-column">
        <a className='detail-link' href={`#plants?plantId=${plantId}`}>
          <p className="list-text">{name}</p>
        </a>
        <p className="list-text">{`Date added: ${dateAdded}`}</p>
        <p className="list-text">{`Expected harvest: ${expectedHarvestDate}`}</p>
      </div>
        <i plantid={plantId} className="delete-list fas fa-times"></i>
    </div>
  );
}
