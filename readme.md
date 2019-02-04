##### Project 1 — WDI — Darwin Smith — 02/04/2019 

# **PONG!**

[Pong](https://en.wikipedia.org/wiki/Pong) is one of the earliest arcade video games. It is a table tennis sports game featuring simple two-dimensional graphics. The game was originally manufactured by Atari, which released it in 1972.

## Intructions

Instructions will be presented to player by an `alert()` popup or a modal, as follows: 

 _The ball will move in any direction. You will score one (1) point every time the ball hits the paddle. You lose if the ball goes past the paddle. **Go bananas**._

When _player_ clicks **Start** the ball will start moving towards left/right, it will bounce off the border of the **Board**. The user will then try to move the paddle (mouse/keypress) to avoid the ball hitting the left side of the screen. The _player_ earns one (1) point every time the ball collides with the paddle. The _playwer_ will lose the game when the ball goes past the paddle.

## Wireframe

[Pong Wireframe](img/pong-wireframe.jpg)

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

## HTML Structure

```
  <header id="banner" class="banner">

    <button id="start-button" class="start-button">Start</button>

    <h1 id="title" class="title">pong</h1>
    <h2 id="score" class="score">Score: 0</h2>

  </header>

  <main id="board" class="board">

    <div id="paddle" class="paddle"></div>

    <div id="ball" class="ball"></div>

  </main>

```
## Implementation

- [X] Base HTML, CSS &amp; JS.
- [ ] Initialize game with `start.button` with click or `enter/return`.
- [ ] Paddle movement with mouse and / or arrow keys.
- [ ] Obtain current height and width of `main.board`.
- [ ] Assign paddle movement relative to mouse movement or arrow keys.
- [ ] Implement collision detection that will check when the ball collides/touches the paddle or any side of the `board`. Potentially using `dataset` for the HTML elements, and CSS classes with transitions and / or keyframes.
- [ ] Create JavaScript object to store state(s), settings and score.
- [ ] Detect and store location of elements relative to each other when they collide.
- [ ] Calculate new target for the colliding element `div.ball`. The ball should move in at a linear speed (Easy).
- [ ] Optional: Difficulty Levels (Easy _default_, Intermediate, Hard, Bananas)

## Reference

- [Pong - Wikipedia](https://en.wikipedia.org/wiki/Pong)

- [2D Collision Detection – MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

- [Let's build basic collision detection in JavaScript! – Eric Lewis](https://wakeful-baritone.glitch.me/)