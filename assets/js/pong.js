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

const ballPos = {
  x: 0,
  y: 0
}

const reset = () => {
  moveBall(window.innerWidth / 2, window.innerHeight / 2);
  turnBallWhite();
}

const setBallPosition = () => {
  const ballPosition = ball.getBoundingClientRect();
  ballPos.x = ballPosition.x;
  ballPos.y = ballPosition.y;
}

const createBall = () => {
  ball.classList.add('ball');
  ball.style.left = `${window.innerWidth / 2}px`;
  ball.style.top = `${window.innerHeight / 2}px`;
};

const moveBall = (x, y) => {
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
};

const bounceBall = () => {
  moveBall(target.x, target.y);
  setTimeout( () => { moveBall(0, target.y) }, 401);
};

let target = {
  x: window.innerWidth - 20,
  y: 200
}

const checkForCollision = () => {
  // const ballPos = ball.getBoundingClientRect();
  const winW = window.innerWidth;
  const winH = window.innerHeight
  if (ballPos.x <= 0 || ballPos.y <= 0 || ballPos.x >= (winW - 40) || ballPos.y >= winH - 40) {
    turnBallRed();
    return true;
  } else {
    turnBallWhite();
    return false;
  }
}


// board.addEventListener('mousemove', moveBallWithMouse);

// const moveBallWithMouse = e => {
  //   const ballPos = ball.getBoundingClientRect()
  //   ball.style.left = `${e.clientX - 20}px`;
  //   ball.style.top = `${e.clientY - 20}px`;
  //   checkForCollision(e, ballPos);
  // }

// const movePaddleWithMouse = e => {
//   const y = e.clientY;
//   if (y > board.offsetTop  && y < board.offsetHeight) {
//     paddle.style.top = `${y-(board.offsetTop) - 45}px`;
//   }
// };

const startGame = () => {
  reset();
  createBall();
};
// startButton.addEventListener('click', startGame);

startGame();
setInterval(checkForCollision, 100);
setInterval(setBallPosition, 100);
