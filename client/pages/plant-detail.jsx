import React from 'react';

export default class PlantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: null
    };
  }

  componentDidMount() {
    console.log('this.props.plantId', this.props.plantId);
    this.setState({
      plant: 'component has mounted'
    });
    console.log('this.state', this.state);
    // fetch(`http://harvesthelper.herokuapp.com/api/v1/plants/?api_key=${process.env.HARVEST_HELPER_API_KEY}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       plant: data
    //     });
    //   });
    // console.log('this.state.plant', this.state.plant);
  }

  render() {
    return (
      <>
        <div className="plant-card">
          <img className="card-img-top"
            src="https://res-1.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/harvest_helper_production/01_tomato"
            alt="Card image cap" />
            <div className="row">
              <h5 className="card-title">Tomatoes</h5>
              <button className="add-remove-btn">Add to garden</button>
            </div>
            <div className="card-body">
              <h4 className="subsection">About</h4>
              <p className="about-text">Kale is a hardy, cool-season green that is part of the cabbage family.
              It grows best in the spring and fall and can tolerate all fall frosts.
              Kale can be used in salads or as a garnish and is rich in minerals and
              vitamins A and C.</p>
              <h4 className="subsection">Plant Care</h4>
              <p className="subtitle">Optimal Sun</p>
              <p></p>
              <p className="subtitle">Optimal Soil</p>
              <p className="subtitle">Planting Considerations</p>
              <p className="subtitle">When to Plant</p>
              <p className="subtitle">Growing from Seed</p>
              <p className="subtitle">Transplanting</p>
              <p className="subtitle">Spacing</p>
              <p className="subtitle">Watering</p>
              <p className="subtitle">Feeding</p>
              <p className="subtitle">Other Care</p>
              <p className="subtitle">Diseases</p>
              <p className="subtitle">Pests</p>
              <p className="subtitle">Harvesting</p>
              <p className="subtitle">Storage Use</p>
            </div>
  </div>
      </>
    );
  }
}
