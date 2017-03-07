// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player whose goal is to reach the water and avoid enemies.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';   
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
   
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {

};


// Instantiating Enemies and Player Objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0,60);
var enemy2 = new Enemy(0,145);
var enemy3 = new Enemy(0,230);
var allEnemies = [];
allEnemies.push(enemy1,enemy2, enemy3);

// Place the player object in a variable called player
var player = new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
