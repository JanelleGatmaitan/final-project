import React from 'react';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gardenId: this.props.gardenId,
      plantsInGarden: []
    };
  }

  componentDidMount() {
    fetch('/api/plantsInGarden')
      .then(res => res.json())
      .then(data => {
        this.setState({
          plantsInGarden: data
        });
      });
  }

  render() {
    return (
      <p>adfasdfsdf</p>
    );
  }
}
