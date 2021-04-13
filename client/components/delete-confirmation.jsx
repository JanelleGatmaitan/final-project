import React from 'react';

export default class GardenForm extends React.Component {
  render() {
    return (
     <div className="shade">
       <div className="delete-modal">
         <p className="delete-confirm-text">
           Are you sure you want to remove this vegetable?
         </p>
         <div className="row">
           <button className="delete-button" id="yes">Yes</button>
           <button className="delete-button" id="no">No</button>
         </div>
       </div>
     </div>
    );
  }
}
