import React from 'react';

export default class GardenForm extends React.Component {
  render() {
    return (
     <div
     display="none"
     className={this.props.className}>
       <div className="modal">
         <p className="modal-text">
           Are you sure you want to remove this vegetable?
         </p>
         <div className="row">
           <button className="modal-button yes" onClick={this.props.clickYes}>Yes</button>
           <button className="modal-button no" onClick={this.props.clickNo}>No</button>
         </div>
       </div>
     </div>
    );
  }
}
