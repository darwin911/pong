const body = document.body;
const banner = body.querySelector('#banner');
const startButton = body.querySelector('#start-button');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');
const easy = document.querySelector('#easy');
const normal = document.querySelector('#normal');
const hard = document.querySelector('#hard');
const ballPos = { x: 20, y: 20, dx: 1, dy: 1};
const ballSize = 40;
let start;
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
let scoreboard = 0;
let highestScore = 0;
let xMultiplier = 1;
let yMultiplier = 1;
let speed = 10;

const movePaddle = e => {
  const mouseY = e.clientY;
  if (mouseY > board.offsetTop  && mouseY < (board.offsetHeight + 100)) {
    paddle.style.top = `${mouseY - (board.offsetTop) - 50}px`;
  }
};

const reset = () => {
  if (scoreboard > highestScore) highestScore = scoreboard;
  ballPos.x = (boardW / 2) - ballSize;
  ballPos.y = (boardH / 2) - ballSize;
  ballPos.dx = 1;
  ballPos.dy = 1;
  score.innerText = `${scoreboard = 0}`
};

const createBall = () => { ball.classList.add('ball'); };

const moveBall = () => {
  ball.style.left = `${ballPos.x * 1}px`;
  ball.style.top = `${ballPos.y * 1}px`;
};

const move = (x, y, dx, dy) => {
  ballPos.x += ballPos.dx * 6.;
  ballPos.y += -ballPos.dy * 6;
  moveBall();
};

const flipY = () => ballPos.dy = -ballPos.dy;
const flipX = () => ballPos.dx = -ballPos.dx;

const lose = () => {
  clearInterval(start);
  alert(`
  PONG
  ${'-'.repeat(10)}
  You lost.
  Score: ${scoreboard}
  Highest Score: ${highestScore}`);
  reset();
};


const checkForCollision = () => {
  const x = ballPos.x; const y = ballPos.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if (y < 0) {
    // Ball hits top border
    return true;
  } else if (x > boardW - ballSize){
    return true;
  } else if (y > boardH - ballSize) {
    return true;
  } else if (x <= 0 && y > (pTop - ballSize) && y < pBottom) {
    return true;
  } else {
    return false;
  }
};

// const checkDifficulty = () => {
//   if (easy.checked) {
//     hard.nextElementSibling.style.color = 'white';
//     ball.style.background = 'white';

//   } else if (normal.checked) {
//     hard.nextElementSibling.style.color = 'white';
//     ball.style.background = 'white';
//   } else if (hard.checked) {
//
//   }
// };

const play = () => {
  const x = ballPos.x; const y = ballPos.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if (!checkForCollision()) {
    move();
  } else {
    if (ballPos.dx > 0 && ballPos.dy < 0) {
      flipX();
      move();
    } else if (ballPos.dx > 0 && ballPos.dy > 0) {
      flipY();
      move();
    } else if (ballPos.dx < 0 && ballPos.dy < 0) {
      flipY();
      move();
    } else if (ballPos.dx < 0 && ballPos.dy > 0) {
      flipX();
      move();
    }
  }

  if (ballPos.x < -20) {
    lose();
  }
};

const startGame = () => {
  clearInterval(start);
  createBall();
  reset();
  start = setInterval( play, speed);
};

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `${scoreboard}`;
};

body.addEventListener('mousemove', movePaddle);
body.addEventListener('keydown', startGame);


// Math.random() < 0.5
