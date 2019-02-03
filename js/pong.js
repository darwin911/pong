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
  board.addEventListener('mousemove', movePaddleWithMouse);
  moveBallLeft();
};

startButton.addEventListener('click', startGame);

const boardHeight = board.offsetHeight;
console.log(boardHeight);

const movePaddleWithMouse = e => {
  const y = e.clientY;
  if (y > board.offsetTop  && y < board.offsetHeight) {
    console.log(y);
    paddle.style.top = `${y-(board.offsetTop) - 45}px`;
  }
};

const moveBallLeft = () => {
  ball.style.left = '14px';
}

const moveBallRandom = () => {

}
