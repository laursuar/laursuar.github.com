/* GLOBAL VARIABLES */
var x;          // starting x-coordinate of the frog
var y;          // starting y-coordinate of the frog
var lives;      // lives 
var gameOver;   // if true -> game over
var level;      // starts at one by default;
var time;       // displays time spent on current level
var carLocal;   // locations of vehicles
var logLocal;   // locations of logs
var carSpeed;   // speed of vehicles
var logSpeed;   // speed of logs
var sprite = new Image();

/* ALL OBJECTS ON BOARD */
var truck;
var pinkcar;
var racecar;
var biglog;
var tinylog;
var snake;
var alligator;
var frog;

sprite.src = "assets/frogger_sprites.png";
sprite.onload = function(){
    init();
    delay = 1000;
    start_game();
}

function start_game(){
    while(!gameOver){
	setInterval(animate(), 1000);
	drawBoard();
	requestAnimationFrame
	gameOver = true;
    }
}

function animate(){
    drawBoard();
    requestAnimationFrame(animate);
}
function drawBoard(){
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    context.fillStyle = "#191970";
    context.fillRect (0, 0, 400, 275);
    context.fillStyle = "#000000";
    context.fillRect (0, 275, 400, 300);
    addImages(context);
}

function addImages(context){
    staticImages(context);
    kineticImages(context);
    frogLives(context);
}

function kineticImages(context){
    biglog.updateelem(biglog.x + 1);
    biglog.drawelem(context);
}

function staticImages(context){
    // TITLE
    context.drawImage(sprite, 14, 12, 320, 40, 14, 12, 340, 40);
    // MARSH
    context.drawImage(sprite, 0, 55, 399, 50, 0, 55, 399, 50);
    // ROAD SIDES
    context.drawImage(sprite, 0, 118, 399, 35, 0, 275, 399, 35);
    context.drawImage(sprite, 0, 118, 399, 35, 0, 485, 399, 35);
    // FOOTER
    addText(context);
}

function addText(context){
    var printlevel = "Level ";
    var printscore = "Score: ";
    var printhighscore = "High Score: ";
    context.fillStyle = "#39FF14";
    context.font = "bold 18px arial";
    context.fillText(printlevel + level, 112, 535);        
    context.font = "bold 14px arial";
    context.fillText(printscore + score, 0, 555);
    context.fillText(printhighscore + highscore, 112, 555);
}

function init(){
    x = 200;           // frog always starts at coords (200, 450);          
    y = 450;          
    lives = 5;         
    gameOver = false;  // when true, either quits game or calls init again.  
    level = 1;         // player starts at level 1     
    time;             
    carLocal;          // ONLY APPLY TO ANIMATION 
    logLocal;   
    carSpeed;          
    logSpeed;
    score = 0;             // keeps track of current score
    highscore = 0;         // does not persist over gameovers or page refresh

    frog = new elem(13, 365, 199, 490, 26, 23);
    truck = new elem(102, 301, 102, 371, 50, 19)
    pinkcar = new elem(8, 264, 350, 434, 28, 23);
    racecar = new elme(43, 263, 400, 244, 31, 27);
    alligator = new elem(156, 328, 30, 60, 88, 32);
    tinylog = new elem(6, 231, 30, 90, 87, 19);
    biglog = new elem(8, 164, 50, 120, 177, 23);
    snake = new elem(182, 271, 286, 186, 39, 21);
}

function elem(spritex, spritey, x, y, width, height){
 // function assumes that height and width of image in sprite is 
 // equal to the desired width and height as represented on the board
    this.height = height;
    this.width = width;
    this.spritex = spritex;
    this.spritey = spritey;
    this.x = x;
    this.y = y;

    this.update = update;
    function update(newx, newy){
	this.x = newx;
	this.y = newy;
    }
    this.animate = animate;
    function animate(movex){
	this.update(this.x + movex, this.y);
    }
    this.drawelem = drawelem;
    function drawelem(context){
	context.drawImage(sprite, this.spritex, this.spritey, this.width,
			  this.height, this.x, this.y, this.width, this.height);
    }
}

function calcscore(){
    if(forward()){
	score = score + 10;
    }
    if(isHome()){
	score = score + 50;
	if(hcount%5 == 0){
	    score = score + 1000;
	}
    }
}
