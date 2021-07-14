import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Spacer
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
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
          <Menu>
            <MenuButton
              bgColor="gray"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Menu
            </MenuButton>
            <MenuList>
              {
                this.getMenuItems().map(item => (
                  <MakeItem key={item.title} item={item} />
                ))
              }
            </MenuList>
          </Menu>
          <Spacer />
          <Button
            bgColor="gray"
            onClick={() => {
              this.context.handleSignOut();
            }
            }>
            {this.getButtonText()}
          </Button>
          <Button
            bgColor="gray"
            onClick={() => { window.location.hash = 'sign-up'; }}
            display={this.hideNewAcc()}>
            Create new account
          </Button>
        </HStack>
      </div>
    );
  }
}

function MakeItem(props) {
  const { title, to } = props.item;
  return (
    <MenuItem onClick={() => {
      window.location.hash = to;
    }}>
      {title}
    </MenuItem>
  );
}
Nav.contextType = AppContext;
