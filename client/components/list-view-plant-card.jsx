import React from 'react';
import {
  HStack,
  Heading,
  CloseButton,
  Image,
  Text,
  Box
} from '@chakra-ui/react';

// function SavedPlant(props) {
//   const { name, dateAdded, expectedHarvestDate, plantId } = props.plant;
//   return (
//     <div className="saved-plant-data">
//       <div className="column">
//         <a href={`#plants?plantId=${plantId}`}>
//           <img src={`/images/${name.toLowerCase()}.jpg`} className="list-img" alt="vegetable"></img>
//         </a>
//       </div>
//       <div className="text-column">
//         <a className='detail-link' href={`#plants?plantId=${plantId}`}>
//           <p className="list-text">{name}</p>
//         </a>
//         <p className="list-text">{`Date added: ${dateAdded}`}</p>
//         <p className="list-text">{`Expected harvest: ${expectedHarvestDate}`}</p>
//       </div>
//       <i plantid={plantId} className="delete-list fas fa-times"></i>
//     </div>
//   );
// }
function SavedPlant(props) {
  const { name, dateAdded } = props.plant;
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
        <CloseButton />
        </HStack>
        <HStack>
          <Image
          src={`/images/${name.toLowerCase()}.jpg`}
          alt="vegetable"
          boxSize="150px"
          objectFit="cover"
          mx="20px"
          />
          <Box>
            <Heading
            fontSize="16px"
            mb="10px"
            >
              {name}
            </Heading>
            <Text>{`Date added: ${dateAdded}`}</Text>
          </Box>
        </HStack>
      </Box>
    < />
  );
}
export default SavedPlant;
