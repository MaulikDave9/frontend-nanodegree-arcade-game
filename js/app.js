
// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Applied to each of enemy instances 
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

    //Object.create(Enemy.prototype);
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // to ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt
    if (this.x > 505)
        this.x = 0;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player whose goal is to reach the water and avoid enemies.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';   
    this.x = x;
    this.y = y;

    this.win = 0;
};

Player.prototype.update = function(dt) {
   
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {

    var inc = 10;

    if ((move == 'left') && (this.x-inc > left_min))
        this.x -= inc;
    if ((move == 'up')   && (this.y-inc > up_min))
        this.y -= inc;
    if ((move == 'right') && (this.x+inc < right_max))
        this.x += inc;
    if ((move == 'down')  && (this.y+inc < down_max))
        this.y += inc;

};

var down_max   = 606;
var up_min     = 0; // How to get canvas.width value from the engine.js.
var left_min   = 0;
var right_max  = 505;

// Instantiating Enemies Objects.
var enemy1 = new Enemy(0,60, 100*Math.random() );
var enemy2 = new Enemy(0,145, 100*Math.random());
var enemy3 = new Enemy(0,230, 100*Math.random());

// All enemy objects in an array allEnemies
var allEnemies = [];
allEnemies.push(enemy1,enemy2, enemy3);

// Place the player object in a variable called player
var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
