import React from 'react';
import Search from './pages/search';
import parseRoute from './lib/parse-route';
import PlantDetail from './pages/plant-detail';
import ListView from './pages/list-view';
import Auth from './pages/auth';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../client/lib/theme';
import Nav from '../client/components/nav';

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
    const userData = user;
    window.localStorage.setItem('react-context-jwt', token);
    window.localStorage.setItem('user-data', JSON.stringify(userData));
    this.setState({ user: userData });
  }

  handleSignOut() {
    window.localStorage.clear();
    this.setState({ user: null });
    window.location.hash = 'sign-in';
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
      return <ListView />;
    }
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }
  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <ChakraProvider theme={theme}>
        <AppContext.Provider value={contextValue}>
            <Nav/>
            {this.renderPage()}
        </AppContext.Provider>
      </ChakraProvider>
    );
  }
}
