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
    const gardenInfo = this.state;
    fetch('/api/gardenStats', {
      method: 'POST',
      body: JSON.stringify(gardenInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log('Garden successfully added: ' + response);
      })
      .catch(err => console.error(err));

  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="garden-form-container">
          <h4 className="garden-form-title">Create New Garden</h4>
          <form className="garden-form">
            <label htmlFor="soil">Soil Quality:</label>
            <input className="form-input" type="text" id="soil" name="soil" onChange={this.props.handleChange} value={this.props.values.soil} /><br />
            <label htmlFor="sun">Sun Exposure:</label>
            <input className="form-input" type="text" id="sun" name="sun" onChange={this.props.handleChange} value={this.props.values.sun} /><br />
            <label htmlFor="size">Size:</label>
            <input className="form-input" type="text" id="size" name="size" onChange={this.props.handleChange} value={this.props.values.size} /><br />
            <label htmlFor="notes">Notes</label><br />
            <textarea rows="10" cols="42" className="form-input" type="text" id="notes" name="notes" onChange={this.handleChange} value={this.props.values.notes} /><br />
            <button type="submit" className="form-btn" onClick={this.props.onSave}>Save</button>
          </form>
        </div>
      </div>
    );
  }
}
