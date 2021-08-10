import React from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack
} from '@chakra-ui/react';

function AuthForm(props) {
  return (
      <VStack
      maxW="60vw"
      margin="auto"
      >
        <FormControl id="username" mb="25px">
          <FormLabel>Username</FormLabel>
          <Input
          name="username"
          isRequired={true}
          type="text"
          onChange={props.handleChange}
          bgColor="gray"
          value={props.usernameValue}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
          type="password"
          name="password"
          onChange={props.handleChange}
          bgColor="gray"
          value={props.passwordValue}
          />
        </FormControl>
        <Button
          type="submit"
          my="15px"
          bgColor="green"
          color="white"
          onClick={props.handleSubmit}
          alignSelf="flex-end"
          _hover={{ bgColor: 'darkGreen' }}
        >
          {props.text}
        </Button>
      </VStack>
  );
}

export default AuthForm;
