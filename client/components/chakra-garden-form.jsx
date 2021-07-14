import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Input,
  Heading,
  Button,
  HStack
} from '@chakra-ui/react';

export default class ChakraGarden extends React.Component {
  render() {
    return (
      <FormControl
        padding={5}
        display={this.props.hide}
        height="440px"
        width="440px"
        // position="aboslute"
        // top="50%"
        // left="50%"
        // transform="translate(-50%, -50%)"
        position="fixed"
        top="0"
        left="0"
    // background: rgba(0, 0, 0, 0.6);
    // z - index=5;
    // width: 100 %;
    // height: 100 %;
      >
        <VStack
          bgColor="gray"
          mx="auto"
          padding='4'
          borderRadius='lg'
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
          width='100%'>
          <Heading my={3}>{this.props.title}</Heading>
          <FormControl id="soil">
            <FormLabel>Soil</FormLabel>
            <Select
              placeholder="Select soil quality"
              onChange={this.props.handleChange}
            >
              <option>Loamy</option>
              <option>Clay</option>
              <option>Sandy</option>
              <option>Silty</option>
              <option>Chalky</option>
              <option>Peaky</option>
            </Select>
          </FormControl>
          <FormControl id="sun">
            <FormLabel>Sun</FormLabel>
            <Select
              placeholder="Select sun exposure"
              onChange={this.props.handleChange}
            >
              <option>Full sun</option>
              <option>Part sun</option>
              <option>Part shade</option>
              <option>Full shade</option>
            </Select>
          </FormControl>
          <FormControl id="size">
            <FormLabel>Garden bed size</FormLabel>
            <Input
              onChange={this.props.handleChange}
              placeholder="eg. 3 x 6 "></Input>
          </FormControl>
          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              resize="none"
              onChange={this.props.handleChange}
            >
            </Textarea>
          </FormControl>
          <HStack>
            <Button
              type="submit"
              bgColor="green"
              color="white"
              onClick={this.props.onSave}
            >
              Save
            </Button>
            <Button
              bgColor="red"
              color="white"
              onClick={this.props.cancel}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      </FormControl>
    );
  }
}
