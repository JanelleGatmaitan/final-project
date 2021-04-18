import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import parseRoute from './lib/parse-route';
import PlantDetail from './pages/plant-detail';
import ListView from './pages/list-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      gardenCreated: null,
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

    fetch('/api/gardenStats')
      .then(response => response.json())
      .then(gardenStats => {
        if (gardenStats.length !== 0) {
          this.setState({
            gardenCreated: true,
            gardenId: gardenStats[0].gardenId
          });
        }
      })
      .catch(err => console.error(err));
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
    if (route.path === 'garden') {
      const gardenId = route.params.get('gardenId');
      return <ListView gardenId={gardenId} />;
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
