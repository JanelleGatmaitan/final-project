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
      status="success"
      // mx="auto"
      maxW={{ base: '70vw', sm: '60vw', lg: '50vw', xl: '40vw' }}
      variant="left-accent"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      // display="none"
    >
      <AlertIcon />
      <AlertTitle mr={2}>Your browser is outdated!</AlertTitle>
      <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
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
