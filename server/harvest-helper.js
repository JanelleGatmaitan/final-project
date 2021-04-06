fetch('http://harvesthelper.herokuapp.com/api/v1/plants/?api_key=349d9448a25ad42ce213e1018c428cd3')
  .then(res => res.json())
  .then(data => {
    const allVegetables = data;
    console.log(allVegetables);
  })
;
