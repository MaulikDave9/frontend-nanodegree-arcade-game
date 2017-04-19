

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Applied to each of enemy instances 
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Enemy collision detection with player
// References for collision logic and code:
// (1) https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// (2) http://jsfiddle.net/knam8/
Enemy.prototype.checkCollision = function() {

    // does the method log a string to the console? is it unvoked?
    // Player whose goal is to reach the water and avoid enemies.
    //console.log("checkCollsion method invoked");
    if ( this.x < player.x + player.width &&
         this.x + player.width > player.x &&
         this.y < player.y + player.height &&
         this.height + this.y > player.y) {
    
            console.log("Collision Detected.")
            return true;
    }
    //console.log(this);
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

// Player movement: up, down, left, right 
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
        this.win = 1;
        alert("Congratulations - you reached the water and won this round!")
    }    

};


// TODO:  How to put this in a function ?? OOP??

// Instantiating Enemies Objects (by looking at console this co-ordinates were determined)
var enemy1  = new Enemy(0,60,  100*Math.random());
var enemy2  = new Enemy(0,145, 100*Math.random());
var enemy3  = new Enemy(0,230, 100*Math.random());
var enemy11 = new Enemy(0,60,  50*Math.random());
var enemy22 = new Enemy(0,145, 50*Math.random());
var enemy33 = new Enemy(0,230, 50*Math.random());

// All enemy objects in an array allEnemies
var allEnemies = [];
allEnemies.push(enemy1,enemy2, enemy3,enemy11,enemy22, enemy33);

// Place the player object in a variable called player
var player = new Player(200, 400);


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
