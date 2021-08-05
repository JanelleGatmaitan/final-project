import React from 'react';
import GardenForm from '../components/garden-form';
import DeleteModal from '../components/delete-confirmation';
import AppContext from '../lib/app-context';
import getLocalStorage from '../lib/get-localStorage';
import SavedPlant from '../components/list-view-plant-card';
import {
  Flex,
  Heading
} from '@chakra-ui/react';
import removePlant from '../lib/remove-plant';

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
    const username = data.username;
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
      return '';
    }
    return 'none';
  }

  cancelRemoval() {
    this.setState({
      isDeleteModalOpen: false
    });
  }

  handleRemove(event) {
    const deletedPlantId = this.state.toDeleteId;
    fetch(`/api/plantsInGarden/${this.state.gardenId}/${deletedPlantId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState({
          isDeleteModalOpen: false,
          plantsInGarden: removePlant(this.state.plantsInGarden, deletedPlantId)
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
            <p className="find-plant">Find a plant.</p>
          </a>
        </div>
      );
    }

    return (
      <>
        <GardenForm
          id="column-left"
          positioning="relative"
          title="My Garden"
          placeHolders={this.state.gardenInfo}
          onSave={this.handleSave}
          handleChange={this.handleChange}
        />
        <div
          className="tasks"
          id="column-right"
        >
          <Heading
            fontSize="18px"
            textAlign="center"
            pt="30px"
          >
            Daily Tasks
          </Heading>
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
        <Flex
          wrap="wrap"
          justifyContent="center"
          my="15px"
        >
          {
            this.state.plantsInGarden.map(plant => (
                <SavedPlant
                delete={this.clickDeleteBtn}
                key={plant.plantId}
                plant={plant}
                clickYes={this.handleRemove}
                />
            ))
          }
        </Flex>
        <DeleteModal hide={this.getDeleteModalClass()} clickYes={this.handleRemove} clickNo={this.cancelRemoval} />
      </>
    );
  }
}

ListView.contextType = AppContext;
