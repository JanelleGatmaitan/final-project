import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import PageContainer from './components/page-container';
import parseRoute from './lib/parse-route';
import getAllVegetables from '../server/harvest-helper';

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
    console.log('route: ', route);
    if (route.path === '') {
      return <Search />;
    } else {
      console.log('page not found');
    }
  }

  render() {
    return (
      <>
        <Drawer />
        <PageContainer>
          {this.renderPage()}
        </PageContainer>
      </>
    );
  }
}
