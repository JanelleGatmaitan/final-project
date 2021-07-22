import React from 'react';
import GardenForm from '../components/garden-form';
import DeleteModal from '../components/delete-confirmation';
import AppContext from '../lib/app-context';
import getLocalStorage from '../lib/get-localStorage';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardenId: null,
      plantsInGarden: null,
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
      toDeleteId: null
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.cancelRemoval = this.cancelRemoval.bind(this);
    this.clickDeleteBtn = this.clickDeleteBtn.bind(this);
    this.getGardenData = this.getGardenData.bind(this);
  }

  componentDidMount() {
    this.getGardenData();
  }

  async getGardenData() {
    const data = getLocalStorage('user-data');
    const username = data.user.username;
    const response = await fetch(`/api/gardenStats/${username}`);
    const gardenData = await response.json();
    if (gardenData.gardenCreated) {
      const plantData = await fetch(`/api/plantsInGarden/${gardenData.gardenStats.gardenId}`);
      const plantsInGarden = await plantData.json();
      const tasks = await fetch(`api/tasksCompleted/${gardenData.gardenStats.gardenId}`);
      const tasksStatus = await tasks.json();
      this.setState({
        gardenInfo: gardenData.gardenStats,
        gardenId: gardenData.gardenStats.gardenId,
        plantsInGarden: plantsInGarden,
        tasksCompleted: tasksStatus
      });
    }
  }

  onClick(event) {
    const taskName = event.target.innerText;
    const previousStatus = this.state.tasksCompleted[taskName];
    const tasksCompletedCopy = Object.assign({}, this.state.tasksCompleted);
    tasksCompletedCopy[taskName] = !previousStatus;
    this.setState({
      tasksCompleted: tasksCompletedCopy
    });
    fetch(`/api/tasksCompleted/${this.state.gardenId}`, {
      method: 'PUT',
      body: JSON.stringify(tasksCompletedCopy),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.error(err));
  }

  getTaskClass(taskName) {
    if (this.state.tasksCompleted[taskName]) {
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
    fetch(`/api/gardenStats/${this.state.gardenId}`, {
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
    fetch(`/api/plantsInGarden/${this.state.gardenId}/${deletedPlantId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState({
          isDeleteModalOpen: false
        });
      }
      )
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.gardenId) {
      return (
        <div className="prompt">
          <p>Plant something to create a garden!</p>
          <a href="#">
            <p>Find a plant.</p>
          </a>
        </div>
      );
    }
    return (
      <>
      <GardenForm
        positioning="relative"
        title="My Garden"
        placeHolders={this.state.gardenInfo}
      />
        {/* <DeleteModal className={this.getDeleteModalClass()} clickYes={this.handleRemove} clickNo={this.cancelRemoval} />
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
          <p className={`task-name ${this.getTaskClass('Water')}`} onClick={this.onClick}>Water</p>
          <p className={`task-name ${this.getTaskClass('Compost')}`} onClick={this.onClick}>Compost</p>
          <p className={`task-name ${this.getTaskClass('Prune')}`} onClick={this.onClick}>Prune</p>
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
        </ul> */}
      </>
    );
  }
}

// function SavedPlant(props) {
//   const { name, dateAdded, expectedHarvestDate, plantId } = props.plant;
//   return (
//     <div className="saved-plant-data">
//       <div className="column">
//         <a href={`#plants?plantId=${plantId}`}>
//           <img src={`/images/${name.toLowerCase()}.jpg`} className="list-img" alt="vegetable"></img>
//         </a>
//       </div>
//       <div className="text-column">
//         <a className='detail-link' href={`#plants?plantId=${plantId}`}>
//           <p className="list-text">{name}</p>
//         </a>
//         <p className="list-text">{`Date added: ${dateAdded}`}</p>
//         <p className="list-text">{`Expected harvest: ${expectedHarvestDate}`}</p>
//       </div>
//         <i plantid={plantId} className="delete-list fas fa-times"></i>
//     </div>
//   );
// }
ListView.contextType = AppContext;
