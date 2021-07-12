import React from 'react';
import { Link } from '@chakra-ui/react';

export default class Prompt extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="modal">
          <p className="modal-text">
            Please <a href="#sign-in">sign in</a> or <a href="#sign-up">register</a> to continue.
         </p>
        </div>
      </div>
    );
  }
}
