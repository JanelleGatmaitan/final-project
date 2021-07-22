import React from 'react';
import {
  VStack,
  HStack,
  Button,
  Heading
} from '@chakra-ui/react';

// export default class DeleteConfirmation extends React.Component {
//   render() {
//     return (
//        <div
//       //  className="modal"
//        display="none"
//        >
//          <p className="modal-text">
//            Are you sure you want to remove this vegetable?
//          </p>
//          <div className="row">
//            <button className="modal-button yes" onClick={this.props.clickYes}>Yes</button>
//            <button className="modal-button no" onClick={this.props.clickNo}>No</button>
//          </div>
//        </div>
//     );
//   }
// }

function DeleteModal(props) {
  return (
    <VStack
      padding="50px"
      position="fixed"
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      bgColor="gray"
      top="45%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={props.hide}
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
  );
}

export default DeleteModal;
