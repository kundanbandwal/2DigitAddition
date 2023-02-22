const TOTAL_QUESTION = 10;

const generateQuestion = (i) => {
  const a = Math.floor(Math.random() * 90) + 10;
  const b = Math.floor(Math.random() * (100 - a));
  return {
    index: i,
    a,
    b,
    answer: a + b,
    isAnswer: false,
    isSolved: false,
    color: getRandomColor(),
  };
};

export const getQuestions = () =>
  [...Array(TOTAL_QUESTION).keys()].map((v, idx) => generateQuestion(idx));

export const randomIndex = () => Math.floor(Math.random() * TOTAL_QUESTION);

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
