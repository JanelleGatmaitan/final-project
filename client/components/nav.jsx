import React from 'react';
import {
  Button,
  HStack,
  Spacer,
  Link
} from '@chakra-ui/react';
import AppContext from '../lib/app-context';

export default class Nav extends React.Component {
  getButtonText() {
    if (this.context.user) {
      return 'Sign Out';
    }
    return 'Sign In';
  }

  hideNewAcc() {
    if (this.context.user) {
      return 'none';
    }
    return '';
  }

  hideGardenLink() {
    if (!this.context.user) {
      return 'none';
    }
    return '';
  }

  getMenuItems() {
    const menuItems = [
      {
        title: 'Search',
        to: ''
      }
    ];
    if (this.context.user) {
      const gardenMenuItem = {
        title: 'My Garden',
        to: 'garden'
      };
      menuItems.push(gardenMenuItem);
      return menuItems;
    }
    return menuItems;
  }

  render() {
    return (
      <div className="drawer">
        <HStack padding={6}>
          <Link
            variant="navLink"
            href="#"
          >
            Search
          </Link>
          <Link
            variant="navLink"
            href="#garden"
            display={this.hideGardenLink()}
          >
            My Garden
          </Link>
          <Spacer />
          <Button
            bgColor="gray"
            _hover={{ bgColor: 'darkGray' }}
            onClick={() => {
              this.context.handleSignOut();
            }
            }>
            {this.getButtonText()}
          </Button>
          <Button
            bgColor="gray"
            _hover={{ bgColor: 'darkGray' }}
            onClick={() => { window.location.hash = 'sign-up'; }}
            display={this.hideNewAcc()}>
            Create new account
          </Button>
        </HStack>
      </div>
    );
  }
}

Nav.contextType = AppContext;
