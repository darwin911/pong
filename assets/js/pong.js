let start;
const body = document.body;
const banner = body.querySelector('#banner');
const startButton = body.querySelector('#start-button');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');
let scoreboard = 0;
let highestScore = 0;
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
let xMultiplier = 1;
let yMultiplier = 1;
//
const turnBallRed = () => ball.style.backgroundColor = 'red';
const turnBallWhite = () => ball.style.backgroundColor = 'white';
// debugger;
const movePaddle = e => {
  const mouseY = e.clientY;
  if (mouseY > board.offsetTop  && mouseY < (board.offsetHeight + 50)) {
    paddle.style.top = `${mouseY - (board.offsetTop) - 50}px`;
  }
};

const ballPos = { x: 0, y: 0, dx: 1, dy: -1};
const ballSize = 40;

const reset = () => {
  if (scoreboard > highestScore) highestScore = scoreboard;
  ballPos.x = (boardW / 2) - (ballSize / 2);
  ballPos.y = (boardH / 2) - (ballSize / 2);
  ballPos.dx = 1;
  ballPos.dy = -1;
  xMultiplier = 1;
  yMultiplier = 1;
  score.innerText = `Score: ${scoreboard = 0}`
  turnBallWhite();
};

const createBall = () => {
  ball.classList.add('ball');
  ball.style.display = "block";
};

const moveBall = () => {
  ball.style.left = `${ballPos.x}px`;
  ball.style.top = `${ballPos.y}px`;
};

const move = (x, y, dx, dy) => {
  ballPos.x += ballPos.dx * (5 * xMultiplier);
  ballPos.y += ballPos.dy * (2.2 * yMultiplier);
  moveBall();
};

const checkForCollision = () => {
  if (ballPos.x <= 0 || ballPos.y <= 0 || ballPos.x >= (boardW - ballSize) || ballPos.y >= boardH - ballSize) {
    turnBallRed(); return true;
  } else {
    turnBallWhite(); return false;
  }
};

const play = () => {
  const x = ballPos.x; const y = ballPos.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight; boardW = board.offsetWidth;

  if ( !checkForCollision() ) {

  } else if (x >= boardW - 40 ) {
    flipX();
  } else if (y >= boardH - 40 || y < 0) {
    flipY();
  } else if (x < 1 && y >= (pTop - 40) && y <= pBottom) {
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
  startButton.classList.add('transparent');
  start = setInterval( play, 15);
};

const flipY = () => ballPos.dy = -ballPos.dy;
const flipX = () => ballPos.dx = -ballPos.dx;

const lose = () => {
  alert(`
    PONG
    ${'-'.repeat(10)}

    You lost. Your score was: ${scoreboard}.
    Highest Score: ${highestScore}
        `);
  clearInterval(start);
  startButton.classList.remove('transparent');
  reset();
};

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `Score: ${scoreboard}`;
  addSpeed();
};

const addSpeed = () => {
  xMultiplier *= 1.01;
  yMultiplier *= 1.03;
};

startButton.addEventListener('click', startGame);
body.addEventListener('mousemove', movePaddle);
