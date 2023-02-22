import React, { useState, useEffect } from 'react';
import './style.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Model from './Modal';
import GameOverModal from './GameOverModal';
import { getQuestions, randomIndex, getRandomColor } from './Model';
import { useSnackbar } from 'notistack';
// import Snackbar from '@material-ui/core/Snackbar';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function App() {
  const [open, setOpen] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  // const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const selectRandomQuestion = () => {
    let isUnique = true;
    let index = 0;
    const isQuestions = questions.some((q) => !q.isAnswer);
    if (!isQuestions) {
      setGameOver(true);
      return;
    }
    do {
      index = randomIndex();
      isUnique = questions[index].isAnswer;
    } while (isUnique);

    setQuestions(
      questions.map((q) => {
        if (q.index == index) {
          q.isAnswer = true;
        }
        return q;
      })
    );
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
    if (lives == 0) {
      setGameOver(true);
    }
  }, [lives]);

  const handleNewGame = () => {
    const q = getQuestions();
    console.log(q);
    setQuestions((qq) => q);
    setQuestion(selectRandomQuestion());
    setGameOver(false);
    setOpen(false);
    setScore(0);
    setLives(3);
    setTime(0);
    // setAnswerOptions(generateAnswerOptions(question.answer));
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
      setLives((lives) => lives - 1);
      enqueueSnackbar('incorrect', {
        variant: 'error',
      });
    }
    setQuestion(selectRandomQuestion());
  };
  return (
    <React.Fragment>
      {open && <Model open={open} handleClose={handleNewGame} />}
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
