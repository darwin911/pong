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
  newMove(0, 0)
  moveBall(); turnBallWhite();
};
const setBallPosition = () => {
  console.log(ballPos.x);
  ballPos.x = ball.offsetLeft;
  ballPos.y = ball.offsetTop;
};
const setPaddlePosition = () => {
  const paddlePosition = paddle.getBoundingClientRect();
  paddlePos.x = paddlePosition.x;
  paddlePos.y = paddlePosition.y;
};
const createBall = () => {
  ball.classList.add('ball');
  newMove(0, (board.offsetHeight / 2) - 20);
};
const moveBall = () => {
  ball.style.left = `${ballPos.x}px`;
  ball.style.top = `${ballPos.y}px`;
};
const newMove = (x, y) => {
  // console.log(ballPos.x);
  ballPos.x += x;
  // console.log(ballPos.x);
  ballPos.y += y;
  moveBall();
}
const continuousMovement = (x, y) => {
  if (!checkForCollision()) {
    newMove(x, y);
  }
  if (checkForCollision()) {
    newMove(x, -y);
    console.log('deflection');
  }
}
const checkForCollision = () => {
  const w = board.offsetWidth;
  const h = board.offsetHeight;
  if (ballPos.x <= 0 || ballPos.y <= 0 || ballPos.x >= (w - 40) || ballPos.y >= h - 40) {
    turnBallRed();
    return true;
  } else {
    turnBallWhite();
    return false;
  }
};

// This function is for debugging
const moveBallWithMouse = e => {
  ballPos.x = e.offsetX;
  ballPos.y = e.offsetY;
  moveBall();
}
// board.addEventListener('mousemove', moveBallWithMouse);
// ----------------------------------------------------------
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
setInterval(moveBall(), 10);

// const bounceBallLoop = setInterval(bounceBall, 1600);


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
