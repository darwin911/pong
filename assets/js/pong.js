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
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
//
const turnBallRed = () => ball.style.backgroundColor = 'red';
const turnBallWhite = () => ball.style.backgroundColor = 'white';
// debugger;
const movePaddleWithMouse = e => {
  const mouseY = e.clientY;
  if (mouseY > board.offsetTop  && mouseY < (board.offsetHeight + 50)) {
    paddle.style.top = `${mouseY - (board.offsetTop) - 50}px`;
  }
};

const ballPos = { x: 0, y: 0, dx: 1, dy: -1};
const ballSize = 40;

const reset = () => {
  ballPos.x = (boardW / 2) - (ballSize / 2);
  ballPos.y = (boardH / 2) - (ballSize / 2);
  ballPos.dx = 1;
  ballPos.dy = -1;
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
  ballPos.x += ballPos.dx * (5 * 2);
  ballPos.y += ballPos.dy * (2.2 * 2);
  moveBall();
};

const checkForCollision = () => {
  if (ballPos.x <= 0 || ballPos.y < 1 || ballPos.x >= (boardW - ballSize) || ballPos.y >= boardH - ballSize) {
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

  } else if (x > boardW - 40 ) {
    flipX();
  } else if (y > boardH - 40 || y < 0) {
    flipY();
  } else if (x < 1 && y >= (pTop - 50) && y <= pBottom) {
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
  start = setInterval( play, 26);
};

const flipY = () => ballPos.dy = -ballPos.dy;
const flipX = () => ballPos.dx = -ballPos.dx;

const lose = () => {
  alert(`You lost. Your score was: ${scoreboard}`);
  clearInterval(start);
  reset();
};

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `Score: ${scoreboard}`;
};

startButton.addEventListener('click', startGame);
body.addEventListener('mousemove', movePaddleWithMouse);
