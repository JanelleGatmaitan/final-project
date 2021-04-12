import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import parseRoute from './lib/parse-route';
import PlantDetail from './pages/plant-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      gardenId: null
    };
  }

  componentDidMount() {
    window.addEventListener(
      'hashchange',
      () => {
        this.setState({
          route: parseRoute(window.location.hash)
        });
      }
    );
    // fetch('/api/gardenStats')
    //   .then(response => response.json())
    //   .then(gardenStats => {
    //     console.log(gardenStats);
    //     this.setState({
    //       gardenId: gardenStats[0].gardenId
    //     });
    //     console.log('this.state', this.state);
    //   });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Search />;
    }
    if (route.path === 'plants') {
      const plantId = route.params.get('plantId');
      return <PlantDetail plantId={plantId} />;
    }
  }

  render() {
    return (
      <>
        <Drawer />
        {this.renderPage()}
      </>
    );
  }
}
