const GameView = require("./game_view");
import '../css/style.scss';

document.addEventListener("DOMContentLoaded", function() {
    const game = new GameView();
    game.start();
})

