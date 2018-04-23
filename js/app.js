// Initialize Global variables
// Variable to store game result
var result = ""; 
// Variable to store and increase game score
var score = 0;
// Variable to store and decrease game lives, default value is 3
var lives = 3; 

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Reset position when enemy is off canvas
    this.offCanvas();

    // Check collision between player and enemies
    this.collision();

    // if score 10 then store 'won' in result to display winning board later
    if (score == 10) {
        result = "won";
    }

    // if lives 0 then store 'lost' in result to display losing board later
    if (lives == 0) {
        result = "lost";
    }
};

// function to reset enemy position
Enemy.prototype.offCanvas = function() {
    if (this.x > 505) {
        this.x = -100;
    }
};
// function to reset player position and decrease lives
Enemy.prototype.collision = function() {
    if ( (player.x < this.x + 60 &&
        player.x + 37 > this.x )&&
        ( player.y < this.y + 25 &&
        30 + player.y > this.y) ) {
        player.x = 200;
        player.y = 380;
        lives = lives - 1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function() {
    // Check for player reaching bottom of canvas and winning the game
    if (this.y > 380) {
        this.y = 380;
    }
    // Check for player reaching right of canvas and winning the game
    if (this.x > 400) {
        this.x = 400;
    }
    // Check for player reaching left of canvas and winning the game
    if (this.x < 0) {
        this.x = 0;
    }
    // Check for player reaching top of canvas and reset player position and increase score
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score = score + 1;
    }
};

Player.prototype.render = function() {
    this.renderTopBoard();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// function to render the score and lives on the top of canvas
Player.prototype.renderTopBoard = function() {
    // display board with score and lives
    ctx.font = "16px Arial";
    ctx.fillText("Score: ", 20, 30);
    ctx.fillText("Live: ", 430, 30);
    ctx.font = "16px Arial";
    ctx.fillText(score, 70, 30);
    ctx.fillText(lives, 470, 30);
    ctx.save();
};
// function to handle player inputs aka movements
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 30;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player(200, 380, 50);
// Place all enemy objects in an array called allEnemies
// randomize enemy's speed
var firstEnemy = new Enemy(0, 60, (Math.floor(Math.random() * 500)));
var secondEnemy = new Enemy(0, 120, (Math.floor(Math.random() * 500)));
var thirdEnemy = new Enemy(0, 180, (Math.floor(Math.random() * 500)));
var forthEnemy = new Enemy(0, 240, (Math.floor(Math.random() * 500)));
var allEnemies = [firstEnemy, secondEnemy, thirdEnemy, forthEnemy];

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