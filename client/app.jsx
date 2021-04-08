import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import parseRoute from './lib/parse-route';
import PageContainer from './components/page-container';
import PlantDetail from './pages/plant-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      menu: false
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
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Search />;
    }
    if (route.path === 'plants') {
      return <PlantDetail />;
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
