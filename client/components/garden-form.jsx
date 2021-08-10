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
        position={props.positioning.position}
        top={props.positioning.top}
        left={props.positioning.left}
        transform={props.positioning.transform}
        display={props.hide}
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
              placeholder={props.placeHolders ? props.placeHolders.soil : undefined}
              value={props.gardenFormValues ? props.gardenFormValues.soil : undefined}
              onChange={props.handleChange}
              name="soil"
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
              placeholder={props.placeHolders ? props.placeHolders.sun : undefined}
              value={props.gardenFormValues ? props.gardenFormValues.sun : undefined}
              onChange={props.handleChange}
              name="sun"
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
              placeholder={props.placeHolders ? props.placeHolders.size : undefined}
              name="size"
              value={props.gardenFormValues ? props.gardenFormValues.size : undefined}
            />
          </FormControl>
          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              resize="none"
              onChange={props.handleChange}
              name="notes"
              value={props.gardenFormValues ? props.gardenFormValues.notes : undefined}
            >
            </Textarea>
          </FormControl>
        <HStack alignSelf="flex-end">
            <Button
              type="submit"
              my="15px"
              bgColor="green"
              _hover={{ bgColor: 'darkGreen' }}
              color="white"
              onClick={props.onSave}
            >
              Save
            </Button>
            <Button
              bgColor="lightRed"
              _hover={{ bgColor: 'darkRed' }}
              color="white"
              display={() => {
                if (!props.cancel) {
                  return 'none';
                }
              }}
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
