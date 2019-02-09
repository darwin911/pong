const body = document.body;
const banner = body.querySelector('#banner');
const startButton = body.querySelector('#start-button');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');
const easy = body.querySelector('#easy');
const normal = body.querySelector('#normal');
const hard = body.querySelector('#hard');
const ballObj = { x: 0, y: 0, dx: 1, dy: 1, size: 40};
let start;
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
let scoreboard = 0;
let highestScore = 0;
let hMove = 5;
let vMove = 5;

const movePaddle = e => {
  const mouseY = e.clientY;
  if (mouseY > board.offsetTop  && mouseY < (board.offsetHeight + 100)) {
    paddle.style.top = `${mouseY - (board.offsetTop) - 50}px`;
  }
};

const reset = () => {
  if (scoreboard > highestScore) highestScore = scoreboard;
  ballObj.x = (boardW / 2) - ballObj.size;
  ballObj.y = (boardH / 2) - ballObj.size;
  ballObj.dx = 1; ballObj.dy = 1;
  hMove = 5; vMove = 5;
  score.innerText = `${scoreboard = 0}`;
};

const createBall = () => { ball.classList.add('ball'); };

const moveBall = () => {
  ball.style.left = `${ballObj.x}px`;
  ball.style.top = `${ballObj.y}px`;
};

const move = () => {
  ballObj.x += ballObj.dx * hMove;
  ballObj.y += -ballObj.dy * vMove;
  moveBall();
};

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `${scoreboard}`;
};

const flipY = () => ballObj.dy = -ballObj.dy;
const flipX = () => ballObj.dx = -ballObj.dx;

const lose = () => {
  reset();
  alert(`
    PONG
    ${'-'.repeat(10)}
    You lost.
    Score: ${scoreboard}
    Highest Score: ${highestScore}`);
  clearInterval(start);
};

const deflect = () => {
  (Math.random() < 0.5) ? vMove *= 1.05 : hMove *= 1.05;
};

const checkForCollision = () => {
  const x = ballObj.x; const y = ballObj.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if (y <= 0) {
    // Ball hits top border
    return true;
  } else if (x >= boardW - ballObj.size){
    return true;
  } else if (y >= boardH - ballObj.size) {
    return true;
  } else if (x <= 0 && y >= (pTop - ballObj.size) && y <= pBottom) {
    return true;
  } else {
    return false;
  }
};

const play = () => {
  const x = ballObj.x; const y = ballObj.y;
  const dx = ballObj.dx; const dy = ballObj.dy;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if (!checkForCollision()) {
    move();
  } else {

    if (dx >= 0 && dy >= 0) {
      (y < 5) ? flipY() : flipX();
      move();
    } else if (dx >= 0 && dy <= 0) {
      (x >= boardW - ballObj.size) ? flipX() : flipY();
      move();
    } else if (dx <= 0 && dy <= 0) {
      if (y >= boardH - ballObj.size) {
        flipY();
      } else if (x < 2) {
        flipX();
        deflect();
        addPoint();
      }
      move();
    } else if (dx <= 0 && dy >= 0) {
      if (y <= 5) {
        flipY();
      } else if (x < 2) {
        flipX();
        deflect();
        addPoint();
      }
      move();
    } else if (dx <= 0) {
      flipX();
      addPoint();
      move();
    }
  }
  if (ballObj.x <= - 10) {lose();}
};

const startGame = () => {
  clearInterval(start);
  createBall();
  reset();
  start = setInterval( play, 1000/60);
};

body.addEventListener('mousemove', movePaddle);
body.addEventListener('keydown', startGame);
