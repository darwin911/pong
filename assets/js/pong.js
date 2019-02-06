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

const movePaddleWithMouse = e => {
  console.log(e.clientY);
  const y = e.clientY;
  if (y > board.offsetTop  && y < (board.offsetHeight + 50)) {
    paddle.style.top = `${y - (board.offsetTop) - 50}px`;
  }
};
body.addEventListener('mousemove', movePaddleWithMouse);

const ballPos = { x: 0, y: 0, dx: 1, dy: 1};
const bSize = 40;

const reset = () => {
  ballPos.x = (boardW / 2) - 20;
  ballPos.y = (boardH / 2) - 20;
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
  if (ballPos.x <= 0 || ballPos.y < 1 || ballPos.x >= (boardW - bSize) || ballPos.y >= boardH - bSize) {
    turnBallRed(); return true;
  } else {
    turnBallWhite(); return false;
  }
};

const startGame = () => {
  reset();
  createBall();
};

startButton.addEventListener('click', startGame);

const flipY = () => ballPos.dy = -ballPos.dy;
const flipX = () => ballPos.dx = -ballPos.dx;

const lose = () => {
  console.log('lose');
  alert(`You lost. Your score was: ${scoreboard}`);
   reset();
}

const addPoint = () => {
  scoreboard += 1;
  score.innerText = `Score: ${scoreboard}`
}

setInterval( () => {
  
  const x = ballPos.x; const y = ballPos.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  boardH = board.offsetHeight;
  boardW = board.offsetWidth;

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
} , 26);
