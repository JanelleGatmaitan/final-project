function removePlant(plants, plantId) {
  let toDelete;
  for (let i = 0; i < plants.length; i++) {
    if (plants[i].plantId == plantId) {
      toDelete = plants[i];
    }
  }
  const index = plants.indexOf(toDelete);
  if (index > -1) {
    plants.splice(index, 1);
  }
  return plants;
}

export default removePlant;
