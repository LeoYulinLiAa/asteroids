const Game = require("./game");

const GameView = function() {

  const appContainer = document.getElementById("app-container");

  this.game = new Game();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  this.dimension = { width: Game.DIM_X, height: Game.DIM_Y }
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

}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
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