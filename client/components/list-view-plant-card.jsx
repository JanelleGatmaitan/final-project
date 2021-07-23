import React from 'react';

function SavedPlant(props) {
  const { name, dateAdded, expectedHarvestDate, plantId } = props.plant;
  return (
    <div className="saved-plant-data">
      <div className="column">
        <a href={`#plants?plantId=${plantId}`}>
          <img src={`/images/${name.toLowerCase()}.jpg`} className="list-img" alt="vegetable"></img>
        </a>
      </div>
      <div className="text-column">
        <a className='detail-link' href={`#plants?plantId=${plantId}`}>
          <p className="list-text">{name}</p>
        </a>
        <p className="list-text">{`Date added: ${dateAdded}`}</p>
        <p className="list-text">{`Expected harvest: ${expectedHarvestDate}`}</p>
      </div>
      <i plantid={plantId} className="delete-list fas fa-times"></i>
    </div>
  );
}

export default SavedPlant;
