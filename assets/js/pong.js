const body = document.body;
const banner = body.querySelector('#banner');
const startBtn = body.querySelector('#start-btn');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');
const ballObj = { x: 100, y: 100, dx: 1, dy: 1, size: 40};
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
let scoreboard = 0;
let highestScore = 0;
let hMove = 1;
let vMove = 1;
let start;

const movePaddle = e => {
  const mouseY = e.clientY;
  if (mouseY > board.offsetTop  && mouseY < (board.offsetHeight + 100)) {
    paddle.style.top = `${mouseY - (board.offsetTop) - 50}px`;
  } else if (mouseY === undefined) {
    const touchY = e.targetTouches[0].clientY;
    e.preventDefault();
    if (touchY > board.offsetTop  && touchY < (board.offsetHeight + 100)) {
      paddle.style.top = `${touchY - (board.offsetTop) - 50}px`;
    }
  }
};

const reset = () => {
  if (scoreboard > highestScore) highestScore = scoreboard;
  ballObj.x = (window.innerWidth / 2) - ballObj.size;
  ballObj.y = window.innerHeight / 2 - ballObj.size;
  ballObj.dx = 1; ballObj.dy = (Math.random() < 0.5) ? 1 : -1;
  hMove = 7; vMove = 5;
  score.innerText = `${scoreboard = 0}`;
};

const createBall = () => { ball.classList.add('ball'); };

const move = () => {
  ballObj.x += ballObj.dx * hMove;
  ballObj.y += -ballObj.dy * vMove;
  ball.style.left = `${ballObj.x}px`;
  ball.style.top = `${ballObj.y}px`;
};

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `${scoreboard}`;
};

const flipY = () => ballObj.dy = -ballObj.dy;
const flipX = () => ballObj.dx = -ballObj.dx;

const lose = () => {
  alert(`
    PONG
    -----------
    You lost.
    Score: ${scoreboard}
    Highest Score: ${highestScore}`);
    reset();
  clearInterval(start);
};

const deflect = () => (Math.random() < 0.5) ? vMove *= 1.020 : hMove *= 1.01;

const checkForCollision = () => {
  const x = ballObj.x; const y = ballObj.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if (y <= 0) {
    return true;
  } else if (x >= boardW - ballObj.size) {
    return true;
  } else if (y >= boardH - ballObj.size) {
    return true;
  } else if (x <= -1 && y >= (pTop - ballObj.size) && y <= pBottom) {
    return true;
  } else {
    return false;
  }
};

const play = () => {
  
  const x = ballObj.x; const y = ballObj.y;
  const dx = ballObj.dx; const dy = ballObj.dy;
  
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if (!checkForCollision()) {
  } else if (dx >= 0 && dy >= 0) {
      (y < 5) ? flipY() : flipX();
  } else if (dx >= 0 && dy <= 0) {
      (x >= boardW - ballObj.size) ? flipX() : flipY();
  } else if (dx <= 0 && dy <= 0) {
      if (y >= boardH - ballObj.size) {
        flipY();
      } else if (x <= 0) {
        flipX(); addPoint(); deflect();
      }
  } else if (dx <= 0 && dy >= 0) {
      if (y <= 5) {
        flipY();
      } else if (x <= 0) {
        flipX(); addPoint(); deflect();
      }
  }
  move();
    if (ballObj.x <= - 15) lose();
};

const startGame = () => {
  clearInterval(start);
  createBall();
  reset();
  start = setInterval( play, 1000/60);
};

body.addEventListener('mousemove', movePaddle);
board.addEventListener('touchmove', movePaddle);
body.addEventListener('keydown', startGame);
body.addEventListener('click', startGame);
