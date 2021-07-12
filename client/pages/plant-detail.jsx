import React from 'react';
import GardenForm from '../components/garden-form';
import DeleteConfirmation from '../components/delete-confirmation';
import Prompt from '../components/prompt-sign-in';
import AppContext from '../lib/app-context';
import getLocalStorage from '../lib/get-localStorage';

export default class PlantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      plant: null,
      user: null,
      gardenCreated: null,
      gardenId: null,
      isInGarden: false,
      isGardenFormOpen: false,
      isDeleteModalOpen: false,
      isPromptOpen: false,
      gardenInfo: {
        soil: null,
        sun: null,
        size: null,
        notes: ' '
      }
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.cancelRemoval = this.cancelRemoval.bind(this);
    this.getGardenFormClass = this.getGardenFormClass.bind(this);
    this.getDeleteModalClass = this.getDeleteModalClass.bind(this);
  }

  componentDidMount() {
    const user = getLocalStorage('user-data');
    const date = new Date();
    const formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    fetch(`https://harvesthelper.herokuapp.com/api/v1/plants/${this.props.plantId}?api_key=${process.env.HARVEST_HELPER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        return this.setState({
          plant: data,
          date: formattedDate
        });
      })
      .catch(err => console.error(err));

    if (!user) {
      return null;
    }

    this.getGardenData();
  }

  async getGardenData() {
    const data = getLocalStorage('user-data');
    const username = data.user.username;
    const response = await fetch(`/api/gardenStats/${username}`);
    const gardenData = await response.json();
    this.setState({
      gardenCreated: gardenData.gardenCreated,
      user: username
    });
    if (gardenData.gardenCreated) {
      const plantData = await fetch(`/api/plantsInGarden/${gardenData.gardenStats.gardenId}/${this.props.plantId}`);
      const plantsInGarden = await plantData.json();
      this.setState({
        isInGarden: plantsInGarden.plantInGarden,
        gardenCreated: gardenData.gardenCreated,
        gardenId: gardenData.gardenStats.gardenId
      });
    }
  }

  handleAdd() {
    const plantAdded = {
      plantId: parseInt(this.props.plantId),
      dateAdded: this.state.date,
      expectedHarvest: ' ',
      gardenId: this.state.gardenId,
      name: this.state.plant.name
    };
    fetch(`/api/plantsInGarden/${this.state.gardenId}/`, {
      method: 'POST',
      body: JSON.stringify(plantAdded),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.error(err));
    this.setState({
      isInGarden: true
    });
  }

  handleRemove() {
    fetch(`/api/plantsInGarden/${this.state.gardenId}/${this.props.plantId}`, {
      method: 'DELETE'
    })
      .then(this.setState({
        isDeleteModalOpen: false,
        isInGarden: false
      }))
      .catch(err => console.error(err));
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
    const plantAdded = {
      plantId: parseInt(this.props.plantId),
      dateAdded: this.state.date,
      expectedHarvest: ' ',
      gardenId: this.state.gardenId,
      name: this.state.plant.name
    };
    const gardenInfo = this.state.gardenInfo;
    const username = this.state.user;
    const reqBody = { plantAdded, gardenInfo, username };
    fetch('/api/gardenStats', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.context.gardenId = data.gardenId;
        this.setState({
          isInGarden: data.plantAdded,
          isGardenFormOpen: false,
          gardenCreated: true,
          gardenId: data.gardenId
        });
      })
      .catch(err => console.error(err));
  }

  handleClick() {
    if (!this.state.user) {
      this.setState({
        isPromptOpen: true
      });
    }
    if (!this.state.gardenCreated && this.state.user) {
      this.setState({
        isGardenFormOpen: true
      });
    }
    if (!this.state.isInGarden && this.state.gardenCreated) {
      return this.handleAdd();
    }
    if (this.state.gardenCreated && this.state.isInGarden) {
      this.setState({
        isDeleteModalOpen: true
      });
    }
  }

  cancelRemoval() {
    this.setState({
      isDeleteModalOpen: false
    });
  }

  getButtonText() {
    if (this.state.isInGarden) {
      return 'Remove from garden';
    }
    return 'Add to garden';
  }

  getGardenFormClass() {
    if (!this.state.isGardenFormOpen) {
      return 'hidden';
    }
    return 'shade';
  }

  getDeleteModalClass() {
    if (this.state.isInGarden && this.state.isDeleteModalOpen) {
      return 'shade';
    }
    return 'hidden';
  }

  getPromptClass() {
    if (this.state.isPromptOpen) {
      return 'shade';
    }
    return 'hidden';
  }

  render() {
    if (!this.state.plant) return null;
    const plant = this.state.plant;
    const imgName = plant.name.replace(' ', '_').toLowerCase();
    return (
      <>
      <DeleteConfirmation className={this.getDeleteModalClass()} clickYes={this.handleRemove} clickNo={this.cancelRemoval}/>
      <Prompt className={this.getPromptClass()}/>
        <GardenForm position="garden-form-absolute" title="Create New Garden" className={this.getGardenFormClass()} onSave={this.handleSave} values={this.state} handleChange={this.handleChange}/>
        <div className="plant-card" plant-id={this.props.plantId}>
          <img className="plant-img"
            src={`/images/${imgName}.jpg`}
            alt="vegetable" />
          <div className="row">
            <h5 className="card-title">{plant.name}</h5>
            <button className="add-remove-btn" onClick={this.handleClick}>{this.getButtonText()}</button>
          </div>
          <div className="card-body">
            <h4 className="subsection">About</h4>
            <p className="plant-info">{plant.description}</p>
            <h4 className="subsection">Plant Care</h4>
            <p className="subtitle">Optimal Sun</p>
            <p className="plant-info">{plant.optimal_sun}</p>
            <p className="subtitle">Optimal Soil</p>
            <p className="plant-info">{plant.optimal_soil}</p>
            <p className="subtitle">Planting Considerations</p>
            <p className="plant-info">{plant.planting_considerations}</p>
            <p className="subtitle">When to Plant</p>
            <p className="plant-info">{plant.when_to_plant}</p>
            <p className="subtitle">Growing from Seed</p>
            <p className="plant-info">{plant.growing_from_seed}</p>
            <p className="subtitle">Transplanting</p>
            <p className="plant-info">{plant.transplanting}</p>
            <p className="subtitle">Spacing</p>
            <p className="plant-info">{plant.spacing}</p>
            <p className="subtitle">Watering</p>
            <p className="plant-info">{plant.watering}</p>
            <p className="subtitle">Feeding</p>
            <p className="plant-info">{plant.feeding}</p>
            <p className="subtitle">Other Care</p>
            <p className="plant-info">{plant.other_care}</p>
            <p className="subtitle">Diseases</p>
            <p className="plant-info">{plant.diseases}</p>
            <p className="subtitle">Pests</p>
            <p className="plant-info">{plant.pests}</p>
            <p className="subtitle">Harvesting</p>
            <p className="plant-info">{plant.harvesting}</p>
            <p className="subtitle">Storage Use</p>
            <p className="plant-info">{plant.storage_use}</p>
          </div>
        </div>
      </>
    );
  }
}

PlantDetail.contextType = AppContext;
