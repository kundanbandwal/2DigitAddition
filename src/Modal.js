import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'black',
  color: '#fff',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Modal({ handleClose }) {
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 200 }}>
          <p className="child-modal-descriptionn">Find the Match</p>
          <h2 className="child-modal-titlee">2 Digit Addition</h2>
          <Button
            style={{ marginLeft: '50px', width: '90px' }}
            variant="contained"
            startIcon={<PlayCircleIcon />}
            onClick={handleClose}
          >
            Start
          </Button>
          <p className="child-modal-titlee">
            Tap the matching answer to eliminate it. repeat Until all answers
            are gone
          </p>
        </Box>
      </Modal>
    </>
  );
}
