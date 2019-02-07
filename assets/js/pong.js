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
let start;
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
let scoreboard = 0;
let highestScore = 0;
let xMultiplier = 1;
let yMultiplier = 1;
const ballPos = { x: 20, y: 20, dx: 1, dy: -1};
const ballSize = 50;

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
  ballPos.dy = -1;
  xMultiplier = 1;
  yMultiplier = 1;
  score.innerText = `${scoreboard = 0}`
};

const createBall = () => { ball.classList.add('ball'); };

const moveBall = () => {
  ball.style.left = `${ballPos.x}px`;
  ball.style.top = `${ballPos.y}px`;
};

const move = (x, y, dx, dy) => {
  ballPos.x += ballPos.dx * (2 * xMultiplier);
  ballPos.y += ballPos.dy * (1.2 * yMultiplier);
  moveBall();
};

const checkForCollision = () => {
  const x = ballPos.x;
  const y = ballPos.y;
  if (x <= 1 || y <= 1) {
    console.log('collision');
    return true;
  } else if (x >= (boardW - (ballSize)) || y >= boardH - ballSize) {
    console.log('collision');
    return true;
  } else {
    return false;
  }
};

const checkDifficulty = () => {
  if (easy.checked) {
    hard.nextElementSibling.style.color = 'white';
    ball.style.background = 'white';
    xMultiplier = 2;
    yMultiplier = 2;
  } else if (normal.checked) {
    hard.nextElementSibling.style.color = 'white';
    ball.style.background = 'white';
    xMultiplier = 3;
    yMultiplier = 3.2;
  } else if (hard.checked) {
    hard.nextElementSibling.style.color = 'yellow';
    ball.style.background = 'orangered';
    xMultiplier = 4;
    yMultiplier = 7;
  }
};

const play = () => {
  const x = ballPos.x; const y = ballPos.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;
  checkDifficulty();
  if ( !checkForCollision() ) {

  } else if (x >= boardW - 40 ) {
    // if ball is at right side
    flipX();
  } else if (y <= 1 || y >= boardH - 50) {
    // if ball is at top or bottom
    flipY();
  } else if (x <= 4 && y >= (pTop - 40) && y <= pBottom) {
    // if ball is at left side and where the paddle is located
    flipX(); addPoint();
  } else if (x <= 1) {
    lose();
  }

  move();
}

const startGame = () => {
  clearInterval(start);
  createBall();
  reset();
  start = setInterval( play, 10);
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

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `${scoreboard}`;
};

body.addEventListener('mousemove', movePaddle);
body.addEventListener('keydown', startGame);
