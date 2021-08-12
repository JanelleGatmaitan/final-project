import React from 'react';
import {
  Heading,
  Box
} from '@chakra-ui/react';

function Tasks(props) {
  return (
    <>
      <Box
        className="tasks"
        id="column-right"
      >
        <Heading
          fontSize="18px"
          textAlign="center"
          pt="30px"
        >
          Daily Tasks
        </Heading>
        <Box className="row task-icons">
          <i className="fas fa-tint task-icon"></i>
          <i className="fas fa-recycle task-icon"></i>
          <i className="fas fa-cut task-icon"></i>
        </Box>
        <Box className="row task-names" cursor="pointer">
          <p className={`task-name ${props.getTaskClass('Water')}`} onClick={props.clickTask}>Water</p>
          <p className={`task-name ${props.getTaskClass('Compost')}`} onClick={props.clickTask}>Compost</p>
          <p className={`task-name ${props.getTaskClass('Prune')}`} onClick={props.clickTask}>Prune</p>
        </Box>
      </Box>
    </>
  );
}

export default Tasks;
