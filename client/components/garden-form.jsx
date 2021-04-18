import React from 'react';

export default class GardenForm extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className={this.props.position}>
          <h4 className="garden-form-title">{this.props.title}</h4>
          <form className="garden-form">
            <label htmlFor="soil">Soil Quality:</label>
            <input className="form-input" type="text" id="soil" name="soil" onChange={this.props.handleChange} value={this.props.values.soil} /><br />
            <label htmlFor="sun">Sun Exposure:</label>
            <input className="form-input" type="text" id="sun" name="sun" onChange={this.props.handleChange} value={this.props.values.sun} /><br />
            <label htmlFor="size">Size:</label>
            <input className="form-input" type="text" id="size" name="size" onChange={this.props.handleChange} value={this.props.values.size} /><br />
            <label htmlFor="notes">Notes</label><br />
            <textarea rows="10" cols="42" className="form-input" type="text" id="notes" name="notes" onChange={this.props.handleChange} value={this.props.values.notes} /><br />
            <button type="submit" className="form-btn" onClick={this.props.onSave}>Save</button>
          </form>
        </div>
      </div>
    );
  }
}
