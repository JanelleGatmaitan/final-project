import React from 'react';
import GardenForm from '../components/chakra-garden-form';
import DeleteConfirmation from '../components/delete-confirmation';
import Prompt from '../components/prompt-sign-in';
import AppContext from '../lib/app-context';
import getLocalStorage from '../lib/get-localStorage';
import AlertComponent from '../components/alert';
import DetailPlantCard from '../components/detail-plant-card';
import { VStack } from '@chakra-ui/layout';

export default class PlantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
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
    this.getGardenFormDisplay = this.getGardenFormDisplay.bind(this);
    this.getGardenFormPosition = this.getGardenFormPosition.bind(this);
    this.cancelGarden = this.cancelGarden.bind(this);
    this.getDeleteModalClass = this.getDeleteModalClass.bind(this);
    this.getAlert = this.getAlert.bind(this);
    this.getAlertDisplay = this.getAlertDisplay.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
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
    const name = target.id;
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
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.context.gardenId = data.gardenId;
        this.setState({
          isInGarden: data.plantAdded,
          isGardenFormOpen: false,
          gardenCreated: true,
          gardenId: data.gardenId,
          showAlert: true
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          gardenCreated: false
        });
      });
  }

  handleClick() {
    if (!this.state.user) {
      this.setState({
        showAlert: true
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

  getAlertDisplay() {
    if (this.state.showAlert) {
      return '';
    }
    return 'none';
  }

  getButtonText() {
    if (this.state.isInGarden) {
      return 'Remove from garden';
    }
    return 'Add to garden';
  }

  getGardenFormDisplay() {
    if (this.state.isGardenFormOpen) {
      return '';
    }
    return 'none';
  }

  getGardenFormPosition() {
    if (this.state.isGardenFormOpen) {
      return 'fixed';
    }
    return '';
  }

  cancelGarden() {
    this.setState({
      isGardenFormOpen: false
    });
  }

  getDeleteModalClass() {
    if (this.state.isInGarden && this.state.isDeleteModalOpen) {
      return 'shade';
    }
    return 'none';
  }

  getPromptClass() {
    if (this.state.isPromptOpen) {
      return 'shade';
    }
    return 'hidden';
  }

  closeAlert() {
    this.setState({
      showAlert: false
    });
  }

  getAlert() {
    if (this.state.gardenCreated) {
      return {
        status: 'success',
        title: 'Your garden has been created!',
        description: 'You can now view saved plants in the "My Garden" tab'
      };
    }

    if (!this.context.user) {
      return {
        status: 'warning',
        title: 'Action required',
        description: 'Sign in or create an account to continue'
      };
    }
    // } else {
    //   return {
    //     status: 'error',
    //     title: 'There was a problem creating the garden',
    //     description: 'Please try again'
    // //   };
    // }
  }

  render() {
    if (!this.state.plant) return null;
    const plant = this.state.plant;
    const imgSrc = plant.name.replace(' ', '_').toLowerCase();
    const alertStyling = this.getAlert();
    return (
      <>
        <DetailPlantCard
          imgUrl={imgSrc}
          title={plant.name}
          plantData={plant}
          addRemove={this.handleClick}
          buttonText={this.getButtonText()}
        />
        {/* <DeleteConfirmation
        className={this.getDeleteModalClass()}
        clickYes={this.handleRemove}
        clickNo={this.cancelRemoval} /> */}
        <Prompt className={this.getPromptClass()} />
        <GardenForm
          title="Create New Garden"
          onSave={this.handleSave}
          values={this.state}
          handleChange={this.handleChange}
          hide={this.getGardenFormDisplay}
          positioning={this.getGardenFormPosition}
          cancel={this.cancelGarden}
        />
        <AlertComponent
          alertStyles={alertStyling}
          hide={this.getAlertDisplay}
          close={this.closeAlert}
        />
      </>
    );
  }
}

PlantDetail.contextType = AppContext;
