import React from 'react';

export default class GardenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="garden-form-container">
          <h4 className="garden-form-title">Create New Garden</h4>
          <form className="garden-form">
            <label htmlFor="soil">Soil Quality:</label>
            <input type="text" id="soil" name="soil" /><br />
            <label htmlFor="sun">Sun Exposure:</label>
            <input type="text" id="sun" name="sun" /><br />
            <label htmlFor="size">Size:</label>
            <input type="text" id="size" name="size" /><br />
            <label htmlFor="notes">Notes</label><br />
            <input type="text" id="notes" name="notes" /><br />
            <button className="form-btn" onClick={this.handleSubmit}>Save</button>
         </form>
        </div>
      </>
    );
  }
}
