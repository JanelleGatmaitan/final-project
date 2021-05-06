import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import parseRoute from './lib/parse-route';
import PlantDetail from './pages/plant-detail';
import ListView from './pages/list-view';
import Auth from './pages/auth';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    fetch(`api/gardenStats/${user.username}`)
      .then(res => res.json())
      .then(gardenStats => {
        if (gardenStats) {
          this.setState({ gardenId: gardenStats.gardenId });
        }
      })
      .catch(err => console.error(err));
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({
      user: null,
      gardenId: null
    });
  }

  componentDidMount() {
    window.addEventListener(
      'hashchange',
      () => {
        this.setState({
          route: parseRoute(window.location.hash)
        });
      });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
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
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }
  }

  render() {
    const { user, route, gardenId } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, gardenId, handleSignIn, handleSignOut };
    return (
    <AppContext.Provider value={contextValue}>
      <>
        <Drawer />
        {this.renderPage()}
      </>
    </AppContext.Provider>
    );
  }
}
