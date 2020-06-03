const Game = require("./game");

const GameView = function() {

  const appContainer = document.getElementById("app-container");

  this.game = new Game();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const dpr = window.devicePixelRatio;
  canvas.width = Game.DIM_X * dpr;
  canvas.height = Game.DIM_Y * dpr;
  canvas.id = "main-canvas";
  context.scale(dpr, dpr);
  canvas.tabIndex = 1;
  canvas.autofocus = true;
  appContainer.appendChild(canvas);

  this.context = context;
  this.canvas = canvas;

  const keybindings = function () {
    canvas.addEventListener("keydown", (event) => {
      switch (event.key) {
        case 'w':
          this.keyStatus |= Game.wMask;
          break;
        case 'a':
          this.keyStatus |= Game.aMask;
          break;
        case 's':
          this.keyStatus |= Game.sMask;
          break;
        case 'd':
          this.keyStatus |= Game.dMask;
          break;
        case ' ':
          this.keyStatus |= Game.spaceMask;
          break;
      }
    });
    canvas.addEventListener("keyup", (event) => {
      switch (event.key) {
        case 'w':
          this.keyStatus &= ~Game.wMask;
          break;
        case 'a':
          this.keyStatus &= ~Game.aMask;
          break;
        case 's':
          this.keyStatus &= ~Game.sMask;
          break;
        case 'd':
          this.keyStatus &= ~Game.dMask;
          break;
        case ' ':
          this.keyStatus &= ~Game.spaceMask;
          break;
      }
    })
  }.bind(this.game);

  keybindings();

}

GameView.prototype.start = function() {
  // this.bindKeyHandlers();
  const refresh = () => {
    this.game.step();
    this.game.draw(this.context);
    requestAnimationFrame(refresh);
  }
  refresh();
}

GameView.prototype.bindKeyHandlers = function() {
  key('W', () => {
    this.game.ship.power([0, -1]);
  })
  key('S', () => {
    this.game.ship.power([0, 1]);
  })
  key('A', () => {
    this.game.ship.power([-1, 0]);
  })
  key('D', () => {
    this.game.ship.power([1, 0]);
  })
  key("space", () => {
      this.game.ship.fireBullet();
  })
}

module.exports = GameView;
