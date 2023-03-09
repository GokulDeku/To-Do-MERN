import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TextField } from '@mui/material';

const TaskEdit = (props) => {

  const [editBox, setEditBox] = useState({
    _id:'', task: '', completed: ''
  });
  
  useEffect(() => {
    setEditBox(props.data);
  }, [props.data])


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.openFlag}
        onClose={props.toggleModal}>

        <Box sx={style}>
          <Typography variant="h6" component="h2">
            <TextField value={editBox.task} label="Task" size="small" 
            onChange={(e) => setEditBox({...editBox, task: e.target.value})}
            InputLabelProps={{shrink: true}}/>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Button onClick={() => props.updateHandler(editBox)}>Update</Button><Button>Delete</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
 
export default TaskEdit;