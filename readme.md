##### Project 1 — WDI — Darwin Smith — 02/07/2019 

# **PONG!**

[Pong](https://en.wikipedia.org/wiki/Pong) is one of the earliest arcade video games. It is a table tennis sports game featuring simple two-dimensional graphics. The game was originally manufactured by Atari, which released it in 1972.

## Instructions

Instructions will be presented to player by an `alert()` popup or a modal, as follows: 

 _The ball will move in any direction. You will score one (1) point every time the ball hits the paddle. You lose if the ball goes past the paddle. **Go bananas**._

When _player_ clicks **Start** the ball will start moving towards left/right, it will bounce off the border of the **Board**. The user will then try to move the paddle (mouse/keypress) to avoid the ball hitting the left side of the screen. The _player_ earns one (1) point every time the ball collides with the paddle. The _player_ will lose the game when the ball goes past the paddle.

## Wireframe

[Pong Wireframe](assets/img/pong-wireframe.jpg)

### Banner 

- Start Button 
- Title 
- Score

### Board

- Paddle
- Ball

## Technologies

- HTML
- CSS (Flexbox)
- JavaScript

## Implementation

- [X] Base HTML, CSS &amp; JS.
- [X] Initialize game with `start.button` with click or `enter/return`.
- [X] Paddle movement with mouse.
- [X] Obtain current height and width of `main.board`.
- [X] Assign paddle movement relative to mouse movement or arrow keys.
- [X] Implement collision detection that will check when the ball collides/touches the paddle or any side of the `board`.
- [ ] Create JavaScript object to store state(s), settings and score.
- [X] Detect and store location of elements relative to each other when they collide.
- [ ] Optional: Difficulty Levels (Easy _default_, Intermediate, Hard, Bananas)

## MVP

- Ball moves on Start. Bounces off borders of `main.board`.
- Detect Paddle collision and make ball bounce.
- `lose()` function when ball goes past paddle.
- `reset()` function to restart game.
- Scoreboard that keeps track of bounces off paddle.
- Responsive to viewport.

## Post-MVP

- Difficulty levels (Easy, Normal, **Bananas**)
- Store Highest Score in Local/Session Storage and display along current Score.
- Second Paddle
- Change speed/direction on impact with paddle

## Code Snippet

`Ball Location: x: 0, y: 0`

`Ball Direction: dx: 1, dy: -1`

`moveBall()` updates the DOM style of `.ball`

`move()` takes the direction(dx and dy), and adds those values to `x` and `y` of `.ball`. This is what makes the ball move in `x/y` direction.
```
const move = (x, y, dx, dy) => {
  ballPos.x += ballPos.dx
  ballPos.y += ballPos.dy * (2.2 * 2);
  moveBall();
};
```
To adjust the speed at which the ball moves you can multiply `ballPos.dx` times any number. The difference in values of `dx` and `dy` will create a different angle to the balls trajectory.

`checkForCollision()` is essentially a custom set of conditions that delineate the border of the `.board` and adjusts for the size of `.ball` on the right and bottom sides.

```
const checkForCollision = () => {

  if (ballPos.x <= 0 || ballPos.y < 1 || ballPos.x >= (boardW - ballSize) || ballPos.y >= boardH - ballSize) {
    turnBallRed();
    return true;
  } else {
    turnBallWhite();
    return false;
  }
};
```

## To-Do

The collision detection and flipX and flipY conditions should be abstracted and consolidated, since the current functions are mapping slightly different borders that will either detect a collision and / or flip the direction of the ball.

```
const checkForCollision = () => {
  const x = ballPos.x;
  const y = ballPos.y;
  if (x <= 1 || y <= 1) {
    console.log('collision');
    return true;
  } else if (x >= (boardW - (ballSize)) || y >= boardH - ballSize) {
    console.log('collision');
    return true;
  } else {
    return false;
  }
};
```


```
const play = () => {
  const x = ballPos.x;
  const y = ballPos.y;

  const pTop = paddle.offsetTop;
  const pBottom = pTop + 100;

  boardH = board.offsetHeight;
  boardW = board.offsetWidth;

  checkDifficulty();

  if ( !checkForCollision() ) {

  } else if (x >= boardW - 40 ) {
    // if ball is at right side
    flipX();
  } else if (y <= 1 || y >= boardH - 50) {
    // if ball is at top or bottom
    flipY();
  } else if (x <= 4 && y >= (pTop - 40) && y <= pBottom) {
    // if ball is at left side and where the paddle is located
    flipX(); addPoint();
  } else if (x <= 1) {
    lose();
  }

  move();
}
```

## Reference

- [Pong - Wikipedia](https://en.wikipedia.org/wiki/Pong)

- [2D Collision Detection – MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

- [Let's build basic collision detection in JavaScript! – Eric Lewis](https://wakeful-baritone.glitch.me/)