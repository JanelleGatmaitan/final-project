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

function GardenForm(props) {
  return (
    <FormControl
      padding={5}
      display={props.hide}
      position={props.positioning}
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <VStack
        bgColor="gray"
        mx="auto"
        padding='4'
        borderRadius='lg'
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        width='100%'>
        <Heading my={3}>{props.title}</Heading>
        <FormControl
          id="soil"
        >
          <FormLabel>Soil</FormLabel>
          <Select
            placeholder="Select soil quality"
            onChange={props.handleChange}
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
            placeholder="eg. 3 x 6 "></Input>
        </FormControl>
        <FormControl id="notes">
          <FormLabel>Notes</FormLabel>
          <Textarea
            resize="none"
            onChange={props.handleChange}
          >
          </Textarea>
        </FormControl>
        <HStack>
          <Button
            type="submit"
            bgColor="green"
            color="white"
            onClick={props.onSave}
          >
            Save
          </Button>
          <Button
            bgColor="red"
            color="white"
            onClick={props.cancel}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}

export default GardenForm;
