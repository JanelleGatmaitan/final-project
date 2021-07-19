import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';

function AlertComponent(props) {
  return (
    <Alert
      status={props.alertStyles.status}
      maxW={{ base: '70vw', sm: '60vw', lg: '50vw', xl: '40vw' }}
      variant="left-accent"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <AlertIcon />
      <AlertTitle mr={2}>{props.alertStyles.title}</AlertTitle>
      <AlertDescription>{props.alertStyles.description}</AlertDescription>
      <CloseButton
      position="absolute"
      right="8px"
      top="8px"
      onClick={() => { console.log('closedbutton'); }}
       />
    </Alert>
  );
}

export default AlertComponent;
