const body = document.body;
const banner = body.querySelector('#banner');
const startButton = body.querySelector('#start-button');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');
const turnBallRed = () => ball.style.backgroundColor = 'red';
const turnBallWhite = () => ball.style.backgroundColor = 'white';

const ballPos =   {x: 0, y: 0};
const paddlePos = {x: 0, y: 0};

const reset = () => {
  moveBall(); turnBallWhite();
};

const setBallPosition = () => {
  const ballPosition = ball.getBoundingClientRect();
  ballPos.x = ballPosition.x;
  ballPos.y = ballPosition.y;
};

const setPaddlePosition = () => {
  const paddlePosition = paddle.getBoundingClientRect();
  paddlePos.x = paddlePosition.x;
  paddlePos.y = paddlePosition.y;
};

const createBall = () => {
  ball.classList.add('ball');
  ball.style.left = `${0}px`;
  ball.style.top = `${(board.offsetHeight / 2) - 20}px`;
};

const moveBall = () => {
  ball.style.left = `${ballPos.x}px`;
  ball.style.top = `${ballPos.y}px`;
};

const newMove = (x, y) => {
  ballPos.x += x;
  ballPos.y += y;
  moveBall();
}

const continuousMovement = (x, y) => {
  if (!checkForCollision()) {
    newMove(x, y);
  }
  if (checkForCollision()) {
    console.log('deflection');
  }
}

// setInterval( () => {
//   continuousMovement(100, 100);
// }, 100);

// const moveTopCenter = () => { moveBall();
// };
// const moveCenterRight = () => moveBall(window.innerWidth - 40, window.innerHeight / 2);
// const moveBottomCenter = () => moveBall(window.innerWidth / 2, window.innerHeight - 40);
// const moveCenterLeft = () => moveBall(0, window.innerHeight / 2);
//
// const bounceBall = () => {
//   // debugger;
//   const topC = setTimeout(moveTopCenter, 0);
//   const centerR = setTimeout(moveCenterRight, 400);
//   const bottomC = setTimeout(moveBottomCenter, 800);
//   const centerL = setTimeout(moveCenterLeft, 1200);
// };

const checkForCollision = () => {
  const winW = board.offsetWidth;
  const winH = board.offsetHeight;
  if (ballPos.x <= 0 || ballPos.y <= 0 || ballPos.x >= (winW - 40) || ballPos.y >= winH - 40) {
    turnBallRed();
    console.log('collision');
    return true;
  } else {
    turnBallWhite();
    return false;
  }
};

// const moveBallWithMouse = e => {
//   console.log(e.currentTarget);
//   ball.style.left = `${e.target.offsetWidth}px`;
//   ball.style.top = `${e.target.offsetHeight}px`;
//   checkForCollision(e, ballPos);
// }
// board.addEventListener('mousemove', moveBallWithMouse);

const movePaddleWithMouse = e => {
  const y = e.clientY;
  if (y > board.offsetTop  && y < board.offsetHeight) {
    paddle.style.top = `${y-(board.offsetTop) - 45}px`;
  }
};

body.addEventListener('mousemove', movePaddleWithMouse);

const startGame = () => {
  reset();
  createBall();
};

// startButton.addEventListener('click', startGame);

startGame();
setInterval(checkForCollision, 50);
setInterval(setBallPosition, 100);
setInterval(setPaddlePosition, 100);

// const bounceBallLoop = setInterval(bounceBall, 1600);
