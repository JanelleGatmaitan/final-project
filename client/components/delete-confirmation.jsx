import React from 'react';

export default class GardenForm extends React.Component {
  render() {
    return (
     <div className={this.props.className}>
       <div className="delete-modal">
         <p className="delete-confirm-text">
           Are you sure you want to remove this vegetable?
         </p>
         <div className="row">
           <button className="delete-button" id="yes" onClick={this.props.clickYes}>Yes</button>
           <button className="delete-button" id="no" onClick={this.props.clickNo}>No</button>
         </div>
       </div>
     </div>
    );
  }
}
