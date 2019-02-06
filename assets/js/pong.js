// const moveBallWithMouse = e => {
  //   bPos.x = (e.offsetX - 20);
  //   bPos.y = (e.offsetY - 20);
  //   move();
  // }
  // board.addEventListener('mousemove', moveBallWithMouse);

// This function is for debugging

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
// ---------------------------------
const turnBallRed = () => ball.style.backgroundColor = 'red';
const turnBallWhite = () => ball.style.backgroundColor = 'white';
const paddlePos = {x: 0, y: 0};

const movePaddleWithMouse = e => {
  const y = e.clientY;
  if (y > board.offsetTop  && y < board.offsetHeight) {
    paddle.style.top = `${y - (board.offsetTop) - 50}px`;
  }
};
body.addEventListener('mousemove', movePaddleWithMouse);

const bPos = { x: 0, y: 0, dx: 1, dy: 1};
const reset = () => {
  bPos.x = (boardW / 2) - 20;
  bPos.y = (boardH / 2) - 20;
  bPos.dx = 1;
  scoreboard = 0;
  moveBall(); turnBallWhite();
};
const createBall = () => {
  ball.classList.add('ball');
  move();
};
const moveBall = () => {
  ball.style.left = `${bPos.x}px`;
  ball.style.top = `${bPos.y}px`;
};
const move = (x, y, dx, dy) => {
  bPos.x += bPos.dx * (5 * 2);
  bPos.y += bPos.dy * parseInt(2.1 * 2);
  moveBall();
}

const checkForCollision = () => {
  if (bPos.x < 1 || bPos.y < 10 || bPos.x >= (boardW - 40) || bPos.y >= boardH - 40) {
    turnBallRed(); return true;
  } else {
    turnBallWhite(); return false;
  }
};

const startGame = () => { reset(); createBall(); };
startGame();

const flipY = () => bPos.dy = -bPos.dy;
const flipX = () => bPos.dx = -bPos.dx;

const lose = () => {
  alert(`You lost. Your score was: ${scoreboard}`)
  reset();
}

const updateScore = () => {
  scoreboard += 1;
  score.innerText = `Score: ${scoreboard}`
}

setInterval( () => {
  const x = bPos.x; const y = bPos.y;
  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;
  console.log(x, y);
  if ( !checkForCollision() ) {

  } else if (x > boardW - 40 ) {
    flipX();
  } else if (y > boardH - 40 || y < 0) {
    flipY();
  } else if (x < 0 && y > (pTop - 50) && y < pBottom) {
    flipX(); updateScore();
  } else if (x < 5) {
    lose();
  }
  move();} , 10);
