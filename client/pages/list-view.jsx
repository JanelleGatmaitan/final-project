import React from 'react';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardenId: this.props.gardenId,
      plantsInGarden: [],
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
    const taskName = event.target.innerText;
    const previousStatus = this.state.tasksCompleted[taskName];
    const tasksCompletedCopy = Object.assign({}, this.state.tasksCompleted);
    tasksCompletedCopy[taskName] = !previousStatus;
    this.setState({
      tasksCompleted: tasksCompletedCopy
    });
  }

  getTaskClass(target, name) {
    console.log(target);
    console.log(name);
    console.log('this.state.tasksCompleted[name]', this.state.tasksCompleted[name]);
    if (this.state.tasksCompleted[name]) {
      console.log('task completed');
      target.className = 'task-completed';
    }
    target.className = 'tgggggge';
  }

  render() {
    return (
      <>
      <DailyTasks onClick={this.onClick} tasksStatus={this.state.tasksCompleted}/>
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

function DailyTasks(props) {
  return (
    <div className="tasks">
      <h3 className="tasks-title">Daily Tasks</h3>
      <div className="row task-icons">
        <i className="fas fa-tint task-icon"></i>
        <i className="fas fa-recycle task-icon"></i>
        <i className="fas fa-cut task-icon"></i>
      </div>
      <div className="row task-names">
        <p className="sdfsd" onClick={props.onClick}>Water</p>
        <p className="task-incomplete" onClick={props.onClick}>Compost</p>
        <p className="task-incomplete" onClick={props.onClick}>Prune</p>
      </div>
    </div>
  );
}
