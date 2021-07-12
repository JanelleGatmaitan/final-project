import React from 'react';
import AppContext from '../lib/app-context';
import { Button } from '@chakra-ui/react';

export default class SignButton extends React.Component() {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  render() {
    const { user } = this.context;
    return (
      <Button>sdfsdfsdf</Button>
    );
  }
}

SignButton.contextType = AppContext;
