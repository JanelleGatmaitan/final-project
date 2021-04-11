import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import parseRoute from './lib/parse-route';
import PlantDetail from './pages/plant-detail';
import GardenForm from './components/garden-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      menu: false,
      gardenCreated: false
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
    //   .then(data => {
    //     console.log(data);
    //     if (data.length !== 0) {
    //       this.setState({
    //         gardenCreated: true
    //       });
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  renderPage() {
    const { route, gardenCreated } = this.state;
    if (route.path === '') {
      return <Search />;
    }
    if (route.path === 'plants') {
      const plantId = route.params.get('plantId');
      return (
        <>
          <PlantDetail plantId={plantId} />;
        </>
      );
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
