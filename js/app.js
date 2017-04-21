// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Applied to each of enemy instances 
    this.sprite  = 'images/enemy-bug.png';
    this.x       = x;
    this.y       = y;
    this.width   = 75; // 101; 
    this.height  = 35; //  171;
    this.speed   = speed;
};

// Enemy collision detection with player
// References for collision logic and code:
// (1) https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// (2) http://jsfiddle.net/knam8/
Enemy.prototype.checkCollision = function() {

    if (this.x                < player.x + player.width  &&
        this.x + this.width   > player.x                 &&
        this.y                < player.y + player.height &&
        this.height + this.y  > player.y) {
    
           console.log("Enemy Collision Detected.");
           player.reset();
    }
}

// Update the enemy's position and check collision
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Multiply any movement by the dt parameter
    // to ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt
    if (this.x > ctx.canvas.width)
        this.x = 0;

    this.checkCollision();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {

    this.sprite = 'images/char-boy.png';   
    this.x      = 200;
    this.y      = 400;
    this.width  = 75; //101;
    this.height = 35; //83;

    this.score = 0;
};

// Player collision detection with Enemy (all the instances of enemies)
// References for collision logic and code:
// (1) https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// (2) http://jsfiddle.net/knam8/
Player.prototype.checkCollision = function() {

    allEnemies.forEach(function(enemy) {

        if (this.x                < enemy.x + enemy.width  &&
            this.x + this.width   > enemy.x                &&
            this.y                < enemy.y + enemy.height &&
            this.height + this.y  > enemy.y) {
    
            console.log("Player Collision Detected.");
            this.reset();            
        }
    });
}

Player.prototype.update = function(dt) {
    this.checkCollision();
};

// Reset player to initial location
Player.prototype.reset = function() {
   this.x = 200;
   this.y = 400;
};


// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player movement: up, down, left, right and check if player reached the water.
Player.prototype.handleInput = function(move) {

    var inc = 10;

    if ((move == 'left')       && (this.x-inc > 0))
        this.x -= inc;
    else if ((move == 'up')    && (this.y-inc > 0))  
        this.y -= inc;
    else if ((move == 'right') && (this.x+inc < 400))
        this.x += inc;
    else if ((move == 'down')  && (this.y+inc < 410))
        this.y += inc;

    if (this.y == 10) {
        this.score += 1;
        
        if (this.score == 10)
            alert("Congratulations - You won the game by reaching the water 10 times!")

        this.reset();
    }    

};

// Place the player object in a variable called player
var player = new Player();

// Instantiating Enemies Objects (by looking at console this co-ordinates were determined)
var enemy1  = new Enemy(0,60,  100*Math.random());
var enemy2  = new Enemy(0,145, 100*Math.random());
var enemy3  = new Enemy(0,230, 100*Math.random());
var enemy11 = new Enemy(0,60,  50*Math.random());
var enemy22 = new Enemy(0,145, 50*Math.random());
var enemy33 = new Enemy(0,230, 50*Math.random());

// TODO: How to let user choose Level 1 or 2
level = 1;

// All enemy objects in an array allEnemies
var allEnemies = [];
if (level == 1)
    allEnemies.push(enemy1,enemy2, enemy3); 
else if (level == 2)
    allEnemies.push(enemy1,enemy2, enemy3,enemy11,enemy22, enemy33);


// This listens for key presses and sends the keys to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});