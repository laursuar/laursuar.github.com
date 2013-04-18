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
sprite.src = "../assets/frogger_sprites.png";
sprite.onload = function(){
   init();
   drawBoard();
   //init();
}

function start_game(){
    // game logic goes here. 
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
    // TITLE
    context.drawImage(sprite, 14, 12, 320, 40, 14, 12, 340, 40);
    // MARSH
    context.drawImage(sprite, 0, 55, 399, 50, 0, 55, 399, 50);
    // ROAD SIDES
    context.drawImage(sprite, 0, 118, 399, 35, 0, 275, 399, 35);
    context.drawImage(sprite, 0, 118, 399, 35, 0, 485, 399, 35);
    // LOG
    context.drawImage(sprite, 6, 197, 118, 21, 75, 200, 118, 21);
    // FROG
    context.drawImage(sprite, 13, 365, 26, 23, 199, 490, 26, 23);
    // CAR 1: TRUCK
    context.drawImage(sprite, 102, 301, 50, 19, 102, 371, 50, 19);
    // CAR 2: PINK THING
    context.drawImage(sprite, 8, 264, 28, 23, 350, 434, 28, 23);
    // FOOTER
    addText(context);
       // FROG LIVES
    context.drawImage(sprite, 13, 335, 27, 20, 0, 520, 25, 15);
    context.drawImage(sprite, 13, 335, 27, 20, 24, 520, 25, 15);
}

function addText(context){
    var printlevel = "Level ";
    var printscore = "Score: ";
    var printhighscore = "High Score: ";

    context.fillStyle = "#39FF14";
    context.font = "bold 18px arial";
    context.fillText(printlevel + level, 50, 535);        
    context.font = "bold 14px arial";
    context.fillText(printscore + score, 0, 555);
    context.fillText(printhighscore + highscore, 112, 555);
}

function init(){
    x = 200;           // frog always starts at coords (200, 450);          
    y = 450;          
    lives = 3;         // frog has 3 lives by default      
    gameOver = false;  // when true, either quits game or calls init again.  
    level = 1;         // player starts at level 1     
    time;             
    carLocal;          // ONLY APPLY TO ANIMATION 
    logLocal;   
    carSpeed;          
    logSpeed;
    score = 0;             // keeps track of current score
    highscore = 0;         // does not persist over gameovers or page refresh
}