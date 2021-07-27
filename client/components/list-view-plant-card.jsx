import React from 'react';
import {
  HStack,
  Heading,
  Image,
  Text,
  Box,
  Link
} from '@chakra-ui/react';

function SavedPlant(props) {
  const { plantId, name, dateAdded } = props.plant;
  return (
    <>
      <Box
        bgColor="gray"
        width="350px"
        height="220px"
        mx="20px"
        mt="15px"
        rounded="6px"
      >
        <HStack
        justifyContent="flex-end"
        mr="9px"
        mt="9px"
        >
          <i
          plantid={plantId}
          className="delete-list fa fa-trash"
          onClick={props.delete}
          />
        </HStack>
        <HStack>
          <Image
            src={`/images/${name.replace(' ', '_').toLowerCase()}.jpg`}
          alt="vegetable"
          boxSize="150px"
          objectFit="cover"
          mx="20px"
          />
          <Box>
            <Link
            href={`#plants?plantId=${plantId}`}
            rel="detail view"
            >
              <Heading
                fontSize="16px"
                mb="10px"
              >
                {name}
              </Heading>
            </Link>
            <Text>{`Date added: ${dateAdded}`}</Text>
          </Box>
        </HStack>
      </Box>
    < />
  );
}
export default SavedPlant;
