
// This function is for debugging
// const moveBallWithMouse = e => {
  //   bPos.x = (e.offsetX - 20);
  //   bPos.y = (e.offsetY - 20);
  //   moveBall();
  // }
  // board.addEventListener('mousemove', moveBallWithMouse);
  // ------------------------------------------------------
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
    paddle.style.top = `${y-(board.offsetTop) - 45}px`;
  }
};
body.addEventListener('mousemove', movePaddleWithMouse);
// ---------------------------------

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
  newMove(1, middleY, 1, -1);
};
const moveBall = () => {
  console.log('move');
  ball.style.left = `${bPos.x}px`;
  ball.style.top = `${bPos.y}px`;
};
const newMove = (x, y, dx, dy) => {
  if (dx > 0) {
    bPos.dx = dx;
    bPos.x += x;
  }
  if (dx < 0) {
    bPos.dx = dx;
    bPos.x -= x;
  }
  if (dy > 0) {
    bPos.dy = dy;
    bPos.y -= y;
  }
  if (dy < 0) {
    bPos.dy = dy;
    bPos.y += y;
  }
  moveBall();
}

const upRight = (x, y, dx, dy) => {
      newMove(50, 50, 1, 1);
};

const downRight = (x, y, dx, dy) => {
      newMove(50, 50, 1, -1);
};

const downLeft = (x, y, dx, dy) => {
      newMove(50, 50, -1, -1);
};

const upLeft = (x, y, dx, dy) => {
      newMove(50, 50, -1, 1);
};

const checkForCollision = () => {
  const w = board.offsetWidth; const h = board.offsetHeight;
  if (bPos.x <= 0 || bPos.y <= 0 || bPos.x >= (w - 40) || bPos.y >= h - 40) {
    turnBallRed(); return true;
  } else {
    turnBallWhite(); return false;
  }
};

const startGame = () => { reset(); createBall(); };
startGame();

const move = () => {
  if (bPos.dx > 0 && bPos.dy > 0) {
    console.log('upRight');
    upRight();
  } else if (bPos.dx > 0 && bPos.dy < 0) {
    console.log('downRight');
    downRight();
  } else if (box.dx < 0 && bPos.dy < 0) {
    console.log('downLeft');
    downLeft();
  }
};

const bounceY = () => {
  bPos.dy = -bPos.dy;
};

const bounceX = () => {
  bPos.dx = -bPos.dx;
}

setInterval( () => {
  debugger;
  boardW = board.offsetWidth;
  boardH = board.offsetHeight;
  console.log(bPos.y)
  console.log(checkForCollision());;
  if ( !checkForCollision() ) {
    console.log('no collision');
    move()
  } else if (bPos.x >= boardW ) {
    bounceX();
    move();
  } else if (bPos.y >= boardH ) {
    console.log('flip Y');
    bounceY();
    move()
  };
  console.log('nothing was called');
} , 1000/2);

// setInterval {
  // Function: check for collision. If collision, change direction
  // Store Direction
// }
