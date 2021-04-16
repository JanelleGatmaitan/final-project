import React from 'react';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardenId: this.props.gardenId,
      plantsInGarden: [],
      taskNames: ['Water', 'Compost', 'Prune'],
      tasksCompleted: {
        Water: false,
        Compost: false,
        Prune: false
      }
    };
    this.onClick = this.onClick.bind(this);
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

  onClick(event) {
    console.log('event.target.innerText', event.target.innerText);
    const taskToggled = event.target.innerText;
    const previousStatus = this.state.tasksCompleted[taskToggled];
    const tasksCompletedCopy = Object.assign({}, this.state.tasksCompleted);
    tasksCompletedCopy[taskToggled] = !previousStatus;
    console.log('this.state.tasksCompleted[taskToggled]', this.state.tasksCompleted[taskToggled]);
    // console.log('tasksCompleted', tasksCompleted);
    this.setState({
      tasksCompleted: tasksCompletedCopy
    });
  }

  render() {
    return (
      <>
      <div className="tasks">
        <h3 className="tasks-title">Daily Tasks</h3>
        <div className="row task-icons">
            <i className="fas fa-tint task-icon"></i>
            <i className="fas fa-recycle task-icon"></i>
            <i className="fas fa-cut task-icon"></i>
        </div>
        <div className="row task-names">
          <p className="task-name" onClick={this.onClick} value="Water">Water</p>
          <p className="task-name">Compost</p>
          <p className="task-name">Prune</p>
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
          <img src={`/images/${name}.jpg`} className="list-img" alt="vegetable"></img>
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
