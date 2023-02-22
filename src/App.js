import React, { useState, useEffect } from 'react';
import './style.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import StartModal from './StartModal';
import GameOverModal from './GameOverModal';
import { getQuestions, randomIndex, getRandomColor } from './Service';
import { useSnackbar } from 'notistack';

export default function App() {
  const [open, setOpen] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const selectRandomQuestion = () => {
    let isUnique = true;
    let index = 0;
    const isQuestions = questions.some((q) => !q.isSolved);
    if (!isQuestions) {
      setGameOver(true);
      return;
    }
    do {
      index = randomIndex();
      isUnique = questions[index].isSolved;
    } while (isUnique);

    return questions[index];
  };

  useEffect(() => {
    if (!gameOver) {
      const timer = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameOver, time]);

  useEffect(() => {
    if (questions.length) {
      setQuestion(selectRandomQuestion());
    }
  }, [questions]);

  useEffect(() => {
    if (lives == 0) {
      setGameOver(true);
    }
  }, [lives]);

  const handleNewGame = () => {
    setQuestions(getQuestions());
    setGameOver(false);
    setOpen(false);
    setScore(0);
    setLives(3);
    setTime(0);
  };

  const handleAnswer = (paramQuestion) => {
    if (question.answer === paramQuestion.answer) {
      // success
      setScore((score) => score + 1);
      enqueueSnackbar('correct', {
        variant: 'success',
      });
      setQuestions(
        questions.map((q) => {
          if (q.index == question.index) {
            q.isSolved = true;
          }
          return q;
        })
      );
    } else {
      // Failed
      setLives((lives) => lives - 1);
      enqueueSnackbar('incorrect', {
        variant: 'error',
      });
    }
    setQuestion(selectRandomQuestion());
  };
  return (
    <React.Fragment>
      {open && <StartModal open={open} handleClose={handleNewGame} />}
      <Box className="container">
        {!open && <Box className="time text-center">{time} sec</Box>}
        <Box className="scoreLive">
          <Box>
            {[...Array(lives).keys()].map((v) => (
              <FavoriteIcon />
            ))}
          </Box>
          Score: <span className="scoreValue">{score}</span>
        </Box>
        <Box className="question text-center">
          {question ? `${question.a} + ${question.b}` : ''}
        </Box>
        <Box className="info text-center">Click on the Correct answer!</Box>
        <Box className="choices">
          {questions.map((question, idx) => (
            <Box
              key={idx}
              className="box"
              style={{
                backgroundColor: question.color,
                visibility: question.isSolved ? 'hidden' : 'visible',
              }}
              onClick={() => handleAnswer(question)}
            >
              {question.answer}
            </Box>
          ))}
        </Box>
      </Box>
      {gameOver && (
        <GameOverModal {...{ score, time }} handleNewGame={handleNewGame} />
      )}
    </React.Fragment>
  );
}
