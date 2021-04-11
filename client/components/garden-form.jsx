import React from 'react';

export default class GardenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soil: ' ',
      sun: ' ',
      size: ' ',
      notes: ' '
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('this.state', this.state);
    const gardenInfo = this.state;
    fetch('/api/gardenStats', {
      method: 'POST',
      body: JSON.stringify(gardenInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <div className="garden-form-container">
          <h4 className="garden-form-title">Create New Garden</h4>
          <form className="garden-form">
            <label htmlFor="soil">Soil Quality:</label>
            <input type="text" id="soil" name="soil" onChange={this.handleChange} value={this.state.soil} /><br />
            <label htmlFor="sun">Sun Exposure:</label>
            <input type="text" id="sun" name="sun" onChange={this.handleChange} value={this.state.sun}/><br />
            <label htmlFor="size">Size:</label>
            <input type="text" id="size" name="size" onChange={this.handleChange} value={this.state.size}/><br />
            <label htmlFor="notes">Notes</label><br />
            <input type="text" id="notes" name="notes" onChange={this.handleChange} value={this.state.notes} /><br />
            <button className="form-btn" onClick={this.handleSubmit}>Save</button>
         </form>
        </div>
      </>
    );
  }
}
