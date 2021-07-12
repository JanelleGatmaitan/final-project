import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading
} from '@chakra-ui/react';

export default class ChakraGarden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    return (
     <FormControl>
       <VStack
       bgColor="gray"
       mx="auto"
       padding='4'
       borderRadius='lg'
       maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
       width='100%'>
         <Heading>Create New Garden</Heading>
         <p>sddfdsf</p>
       </VStack>
     </FormControl>
    );
  }
}
