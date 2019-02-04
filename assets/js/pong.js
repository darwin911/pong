const body = document.body;
const banner = body.querySelector('#banner');
const startButton = body.querySelector('#start-button');
const title = body.querySelector('#title');
const score = body.querySelector('#score');
const board = body.querySelector('#board');
const paddle = body.querySelector('#paddle');
const ball = body.querySelector('#ball');


const startGame = () => {
  console.log('Start Game');
  // board.addEventListener('mousemove', movePaddleWithMouse);
  ball.classList.add('ball');
};

const getBoundary = element => {
  const elementBoundingRect = element.getBoundingClientRect();
  console.log(elementBoundingRect);
  return elementBoundingRect;
}

const turnBallRed = () => {
  ball.style.backgroundColor = 'red';
}

const checkForCollision = (e, ballPos) => {

  if (ballPos.x < 0 || ballPos.y < 0) {
    turnBallRed();
  } else if (ballPos.x >= (window.innerWidth - 40) ) {
    turnBallRed();
  } else if (ballPos.y >= (window.innerHeight - 40) ) {
    turnBallRed();
  } else {
    ball.style.backgroundColor = 'white';
  }
}

const moveBallWithMouse = e => {
  const ballPos = ball.getBoundingClientRect()
  console.log('ballPositionX: ', ballPos.x);
  ball.style.left = `${e.clientX - 20}px`;
  ball.style.top = `${e.clientY - 20}px`;
  console.log('style left: ', ball.style.left);
  checkForCollision(e, ballPos);
}


board.addEventListener('mousemove', moveBallWithMouse);

startButton.addEventListener('click', startGame);

// const movePaddleWithMouse = e => {
//   const y = e.clientY;
//   if (y > board.offsetTop  && y < board.offsetHeight) {
//     paddle.style.top = `${y-(board.offsetTop) - 45}px`;
//   }
// };

const setBall = (x, y) => {
  ball.style.left =
}

startGame();
