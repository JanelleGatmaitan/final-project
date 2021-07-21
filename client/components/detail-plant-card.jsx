import React from 'react';
import {
  VStack,
  HStack,
  Image,
  Button,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react';

function DetailPlantCard(props) {
  return (
    <>
    <VStack>
        <Image
          mt="40px"
          objectFit="cover"
          alt="vegetable"
          maxH={{ base: '80vh', sm: '70vh', lg: '50vh', xl: '40vh' }}
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
          src={`/images/${props.imgUrl}.jpg`}
          />
    </VStack>
      <HStack
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        m="auto"
        mt="25px"
        justifyContent="space-between"
      >
        <Heading>{props.title}</Heading>
        <Button
        bgColor="green"
        padding="25px"
        _hover={{ bgColor: 'darkGreen' }}
        onClick={props.addRemove}
        >
          {props.buttonText}
        </Button>
      </HStack>
      <VStack
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        m="auto"
        mt="25px"
      >
        <h2>Description</h2>
        <p>{props.plantData.description}</p>
      </VStack>
      <Accordion
        allowToggle
        mx="auto"
        my="25px"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Optimal Soil
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.optimal_soil}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Optimal Sun
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.optimal_sun}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Planting Considerations
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.planting_considerations}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                When to Plant
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.when_to_plant}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Growing from Seed
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.growing_from_seed}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Transplanting
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.transplanting}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Spacing
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.spacing}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Watering
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.watering}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Feeding
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.feeding}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Other Care
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.other_care}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Diseases
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.diseases}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Pests
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.pests}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Harvesting
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.harvesting}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Storage
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.plantData.storage_use}
          </AccordionPanel>
        </AccordionItem>

      </Accordion>
      </>
  );
}

export default DetailPlantCard;
