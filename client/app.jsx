import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import parseRoute from './lib/parse-route';
import PlantDetail from './pages/plant-detail';
import ListView from './pages/list-view';
import Auth from './pages/auth';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      gardenCreated: null,
      gardenId: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
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
    if (route.path === 'sign-in') {
      return <Auth />;
    }
  }

  render() {
    // if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
    <AppContext.Provider value={contextValue}>
        <Drawer />
        {this.renderPage()}
    </AppContext.Provider>
    );
  }
}
