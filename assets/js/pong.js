let start;
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
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
let scoreboard = 0;
let highestScore = 0;
let xMultiplier = 1;
let yMultiplier = 1;
const ballPos = { x: 0, y: 0, dx: 1, dy: -1};
const ballSize = 40;

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
  score.innerText = `Score: ${scoreboard = 0}`
};

const createBall = () => { ball.classList.add('ball'); };

const moveBall = () => {
  ball.style.left = `${ballPos.x}px`;
  ball.style.top = `${ballPos.y}px`;
};

const move = (x, y, dx, dy) => {
  ballPos.x += ballPos.dx * (4 * xMultiplier);
  ballPos.y += ballPos.dy * (1.2 * yMultiplier);
  moveBall();
};

const checkForCollision = () => {
  if (ballPos.x <= 1 || ballPos.y <= 10 || ballPos.x >= (boardW - (ballSize + 25)) || ballPos.y >= boardH - ballSize) {
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

  } else if (x >= boardW - 50 ) {
    flipX();
  } else if (y >= boardH - 50 || y <= 5) {
    flipY();
  } else if (x <= 1 && y >= (pTop - 40) && y <= pBottom) {
    flipX(); addPoint();
  } else if (x < 0) {
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
    You lost. Your score was: ${scoreboard}
    Highest Score: ${highestScore}`);
  reset();
};

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `Score: ${scoreboard}`;
};

body.addEventListener('mousemove', movePaddle);
body.addEventListener('keydown', startGame);
