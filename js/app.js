/* global variable: stopEnemy to stop the enemy movement upon end of the game.
 * global variable numEnemies can be changed for making game harder or easier.
*/
var stopEnemy = 1; 
var numEnemies = 6

/* Returns random integer from given range!
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/* Enemies the player must avoid
 * Randomly generate 6 enemies on three rows of stones 
*/
var Enemy = function(x, y, speed) {

    var posX = 0;
    var posY = [60, 145, 230, 60, 145, 230];

    this.sprite = 'images/enemy-bug.png';
    this.width = 50;  
    this.height = 50; 
    this.x = posX;
    this.y = posY[getRandomInt(0, posY.length)];
    this.speed = getRandomInt(50, 100) * Math.random();

};

/* Enemy collision detection with player
 * References for collision logic and code:
 * (1) https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 * (2) http://jsfiddle.net/knam8/
 */
Enemy.prototype.checkCollision = function() {

    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {

        //console.log("Enemy Collision Detected.");    
        player.collisions += 1;
        player.reset();
    }
}

/* Update the enemy's position and check collision
 * Parameter: dt, a time delta between ticks
 * Multiply any movement by the dt parameter to ensure the game
 * runs at the same speed for all computers.
 */
Enemy.prototype.update = function(dt) {


    this.x += this.speed * dt * stopEnemy;
    if (this.x > ctx.canvas.width)
        this.x = 0;

    this.checkCollision();
};

/* Draw the enemy on the screen
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player object (image and dimensions, size)
*/
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.width = 50; 
    this.height = 50; 

    this.collisions = 0;
    this.score = 0;
};

Player.prototype.update = function(dt) {};

/* Reset player to initial location
 */
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


/* Draw the player on the screen and print the winning message.
 * Display number of collisions 
 * Lose game if >= 5 collisions before reaching water
 * Win the game if reach the water with less than 5 collisions.
 */
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'red';
    ctx.fillText('Collisions: ' + this.collisions + '(Maximum 5 Collisions before reaching water to win the game)', 10, 605);


    ctx.font = '18pt Calibri';
    if (this.collisions >= 5) {
        ctx.fillStyle = 'red';
        ctx.fillText('Sorry, you lost the game, too many collisions!', 10, 30);
        this.reset();
        stopEnemy = 0;
    }

    if (this.score === 1) {
        ctx.fillStyle = 'green';
        ctx.fillText('Congratulations you won the game!', 10, 30);
        this.reset();
        stopEnemy = 0;
    }
};

/* Player movement: up, down, left, right
 * Check if player reached the water.
 */
Player.prototype.handleInput = function(move) {

    var inc = 10;

    if ((move === 'left') && (this.x - inc > 0))
        this.x -= inc;
    else if ((move === 'up') && (this.y - inc > 0))
        this.y -= inc;
    else if ((move === 'right') && (this.x + inc < 400))
        this.x += inc;
    else if ((move === 'down') && (this.y + inc < 410))
        this.y += inc;

    if (this.y === 10) {
        this.score += 1;
        this.reset();
    }

};

/* Place the player object in a variable called player
 */
var player = new Player();

/* Instantiating Enemies Objects and put in an array allEnemies.
 */
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy());
}


/* This listens for key presses and sends the keys to Player.handleInput() method. 
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});