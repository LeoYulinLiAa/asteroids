const Game = require("./game");
const Consts = require("./consts")

const GameView = function () {

  const appContainer = document.getElementById("app-container");

  this.game = new Game();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const dpr = window.devicePixelRatio;
  canvas.width = Consts.DIM_X * dpr;
  canvas.height = Consts.DIM_Y * dpr;
  canvas.id = "main-canvas";
  context.scale(dpr, dpr);
  canvas.tabIndex = 1;
  canvas.autofocus = true;
  appContainer.appendChild(canvas);

  const switchModeAction = function () {
    switchModeButton.innerText = `Switch to ${this.getControlMode()} mode`;
    this.setControlMode(this.getControlMode() === 'polar' ? 'cartesian' : 'polar');
  }.bind(this.game);

  const switchModeButton = document.createElement("button");
  switchModeButton.onclick = switchModeAction;
  switchModeButton.innerText = `Switch to ${this.game.getControlMode() === 'polar' ? 'cartesian' : 'polar'} mode`;
  appContainer.appendChild(switchModeButton);

  this.context = context;
  this.canvas = canvas;

  const keybindings = function () {
    canvas.addEventListener("keydown", (event) => {
      switch (event.key) {
        case 'w':
          this.keyStatus |= Consts.wMask;
          break;
        case 'a':
          this.keyStatus |= Consts.aMask;
          break;
        case 's':
          this.keyStatus |= Consts.sMask;
          break;
        case 'd':
          this.keyStatus |= Consts.dMask;
          break;
        case ' ':
          this.keyStatus |= Consts.spaceMask;
          break;
      }
    });
    canvas.addEventListener("keyup", (event) => {
      switch (event.key) {
        case 'w':
          this.keyStatus &= ~Consts.wMask;
          break;
        case 'a':
          this.keyStatus &= ~Consts.aMask;
          break;
        case 's':
          this.keyStatus &= ~Consts.sMask;
          break;
        case 'd':
          this.keyStatus &= ~Consts.dMask;
          break;
        case ' ':
          this.keyStatus &= ~Consts.spaceMask;
          break;
        case 'Escape':
          switchModeAction();
          break;
      }
    })
  }.bind(this.game);

  keybindings();

}

GameView.prototype.start = function () {
  // this.bindKeyHandlers();
  const refresh = () => {
    this.game.step();
    this.game.draw(this.context);
    requestAnimationFrame(refresh);
  }
  refresh();
}

GameView.prototype.bindKeyHandlers = function () {
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
