import React, { useState } from 'react';

import Container from '@mui/material/Container';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Taskbox = (props) => {

  const containerStyles = {
    background: '#f2f6fc',
    display: 'flex', 
    alignItems: 'center',
    flexWrap: 'wrap', 
    marginBottom: '10px',
  }

  const iconStyles = {
    paddingRight: '10px',
    cursor: 'pointer'
  }

  return (
    <div>
      {props.tasks.map((data) => (
        <Container key={data._id} maxWidth="sm" sx={{ border: 1, borderColor: 'black', borderRadius: '6px' }} style={containerStyles}>

          {data.completed ? <TaskAltIcon style={ iconStyles } onClick={ () => props.completeHandler(data._id)} /> :
          <RadioButtonUncheckedIcon style={ iconStyles } onClick={ () => props.completeHandler(data._id)}/>}

          <p onClick={() => props.passData(data)} key={data._id} style={{cursor: 'pointer'}}>
            {data.task}
          </p>
        </Container>))
      }
    </div>
  );
}
 
export default Taskbox;
