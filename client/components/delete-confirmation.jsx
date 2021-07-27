import React from 'react';
import {
  VStack,
  HStack,
  Button,
  Heading,
  Box
} from '@chakra-ui/react';

function DeleteModal(props) {
  return (
    <Box className="shade" display={props.hide}>
      <VStack
        padding="50px"
        position="fixed"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        bgColor="gray"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        rounded="6px"
      >
        <Heading
          align="center"
          fontSize="18px"
          mb="25px"
        >
          Are you sure you want to delete this vegetable?
        </Heading>
        <HStack
          justifyContent="space-around"
        >
          <Button
            padding="20px"
            width="88px"
            bgColor="lightGreen"
            _hover={{ bgColor: 'darkGreen' }}
            onClick={props.clickYes}
            plantid={props.key}
          >
            Yes
          </Button>
          <Button
            padding="20px"
            width="88px"
            bgColor="lightRed"
            _hover={{ bgColor: 'darkRed' }}
            onClick={props.clickNo}
          >
            No
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default DeleteModal;
