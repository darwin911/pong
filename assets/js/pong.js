
// This function is for debugging

// const setbPosition = () => {
  //   // console.log(bPos.x);
  //   bPos.x = ball.offsetLeft;
  //   bPos.y = ball.offsetTop;
  // };
const body = document.body;
const banner = body.querySelector('#banner');
const startButton = body.querySelector('#start-button');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');
let boardW = board.offsetWidth;
let boardH = board.offsetHeight;
// ---------------------------------
const turnBallRed = () => ball.style.backgroundColor = 'red';
const turnBallWhite = () => ball.style.backgroundColor = 'white';
const setPaddlePosition = () => {
  const paddlePosition = paddle.getBoundingClientRect();
  paddlePos.x = paddlePosition.x;
  paddlePos.y = paddlePosition.y;
};
const paddlePos = {x: 0, y: 0};
const movePaddleWithMouse = e => {
  const y = e.clientY;
  if (y > board.offsetTop  && y < board.offsetHeight) {
    paddle.style.top = `${y-(board.offsetTop) - 0}px`;
  }
};
body.addEventListener('mousemove', movePaddleWithMouse);

const bPos = { x: 0, y: 0, dx: 1, dy: 1};
const reset = () => {
  bPos.x = ball.offsetTop;
  bPos.y = ball.offsetLeft;
  moveBall(); turnBallWhite();
};
const createBall = () => {
  const middleY = (board.offsetHeight / 2) - 20;
  const middleX = (board.offsetWidth / 2) - 20;
  ball.classList.add('ball');
  move(1, middleY, 1, -1);
};
const moveBall = () => {
  console.log('move');
  ball.style.left = `${bPos.x}px`;
  ball.style.top = `${bPos.y}px`;
};
const move = (x, y, dx, dy) => {
  bPos.x += bPos.dx * 1;
  bPos.y += bPos.dy * 1;
  moveBall();
}

const checkForCollision = () => {
  const w = board.offsetWidth; const h = board.offsetHeight;
  if (bPos.x < 1 || bPos.y < 10 || bPos.x >= (w - 40) || bPos.y >= h - 40) {
    turnBallRed(); return true;
  } else {
    turnBallWhite(); return false;
  }
};

const startGame = () => { reset(); createBall(); };
startGame();

const flipY = () => bPos.dy = -bPos.dy;
const flipX = () => bPos.dx = -bPos.dx;

// const moveBallWithMouse = e => {
//   bPos.x = (e.offsetX - 20);
//   bPos.y = (e.offsetY - 20);
//   move();
// }
// board.addEventListener('mousemove', moveBallWithMouse);

setInterval( () => {
  boardW = board.offsetWidth;
  boardH = board.offsetHeight;
  if ( !checkForCollision() ) {
    // console.log('no collision');
  } else if (bPos.x >= boardW - 60 ) {
    flipX();
  } else if (bPos.y >= boardH - 60 ) {
    flipY();
  } else if (bPos.y <= 0) {
    flipY();
  } else if (bPos.x <= 0) {
    // flipX();
  }
  move();
} , 15);

// setInterval {
  // Function: check for collision. If collision, change direction
  // Store Direction
// }
