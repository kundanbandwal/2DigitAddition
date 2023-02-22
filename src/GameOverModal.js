import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'black',
  color: '#fff',
  borderRadius: '5px',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function GameOverModal({
  handleClose,
  score,
  time,
  handleNewGame,
}) {
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 200, cursor: 'pointer' }}>
          <p className="child-modal-descriptionn">GAME OVER</p>
          <Divider
            sx={{
              width: '100%',
              height: '1px',
              bgcolor: 'grey',
              marginBottom: '5px',
            }}
          />
          <Box className="model2">
            <Box className="model12">
              <Box className="child-modal-title">Score</Box>
              <span style={{ fontSize: '35px', fontWeight: 600 }}>{score}</span>
            </Box>
            <Box className="model22">
              <Box className="child-modal-title">Time</Box>
              <span style={{ fontSize: '35px', fontWeight: 600 }}>
                {time} sec
              </span>
            </Box>
          </Box>
          <Divider
            sx={{
              width: '100%',
              height: '1px',
              bgcolor: 'grey',
              marginTop: '5px',
            }}
          />
          <Button
            variant="contained"
            sx={{
              marginTop: '25px',
              marginLeft: '20px',
              bgcolor: 'grey',
            }}
            onClick={handleNewGame}
          >
            Start New Game
          </Button>
        </Box>
      </Modal>
    </>
  );
}
