var script = document.createElement('script');
script.src = 'assets/jquery-1.9.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/* Game Variables */
lives = 5; level = 1; frogs = 0; score = 0; highscore = 0;
var sprite = new Image();
sprite.src = "assets/frogger_sprites.png";
canvasx = 400; canvasy = 565;
up = -2; down = 2; left = -1; right = 1;
moveup = 10; froghome = 100; fivefrogs = 1000;

/* All kinetic game pieces */
var pieces = new Array();
sprite.onload = function(){
    init_game();
    draw_game();
}

function start_game(){
    while(running){
	document.onkeydown = move;
	return setInterval(draw_game, 100);
    }
}

function move(e) {
    e = e || event;
    if(!e.ctrlKey){
	switch (e.keyCode) {
	case 37:
	    frogger.move(left);
	    return;
	case 38: 
	    frogger.move(up);
	    return;
	case 39: 
	    frogger.move(right);
	    return;
	case 40: 
	    frogger.move(down);
	    return;
	default:
	    alert("pause game");
	}
    }
}

function init_game(){
    lives = 5;         
    running = true;  
    level = 1;         
    score = 0;             
    highscore = 0;         
    all_frogs();    
    all_trucks(102, 301, 102, 371, 50, 19, left);
    all_pinkcars(8, 264, 350, 434, 28, 23, left);
    all_racecars(43, 263, 400, 315, 31, 27, right);
    all_tinylogs(6, 231, 30, 150, 87, 19, right);
    all_biglogs(8, 164, 50, 120, 177, 23, left);
}

function all_frogs(){
    frogger = new piece(11,  369, 199, 490, 22, 18, up);
    upmove   = new piece(46,  367, 0,   0,   20, 24, up);
    dfrogger = new piece(80,  369, 0,   0,   22, 18, down);
    dmove    = new piece(114, 367, 0,   0,   20, 24, down);
    lfrogger = new piece(82,  336, 0,   0,   18, 22, left);
    lmove    = new piece(112, 338, 0,   0,   25, 21, left);
    rfrogger = new piece(12,  335, 0,   0,   18, 22, right);
    rmove    = new piece(44,  335, 0,   0,   24, 22, right);
    pieces.push(frogger);
}

function all_trucks(sx, sy, x, y, width, height, dir){
    truck1   = new piece(sx, sy, x, y, width, height, dir);
    truck2   = new piece(sx, sy, width*2 + x, y, width, height, dir);
    truck3   = new piece(sx, sy, width*3 + x, y, width, height, dir);
    pieces.push(truck1);
    pieces.push(truck2);
    pieces.push(truck3);
}

function all_pinkcars(sx, sy, x, y, width, height, dir){
    pinkcar1   = new piece(sx, sy, x, y, width, height, dir);
    pinkcar2   = new piece(sx, sy, width*3 + x, y, width, height, dir);
    pinkcar3   = new piece(sx, sy, (width*3 + x)/2, y, width, height, dir);
    pieces.push(pinkcar1);
    pieces.push(pinkcar2);
    pieces.push(pinkcar3);
}

function all_racecars(sx, sy, x, y, width, height, dir){
    racecar1   = new piece(sx, sy, x, y, width, height, dir);
    racecar2   = new piece(sx, sy, width*3 + x, y, width, height, dir);
    racecar3   = new piece(sx, sy, width*1.5 + x, y, width, height, dir);
    pieces.push(racecar1);
    pieces.push(racecar2);
    pieces.push(racecar3);
}

function all_tinylogs(sx, sy, x, y, width, height, dir){
    y2 = 250;
    tinylog1   = new piece(sx, sy, x + width*1.5, y, width, height, dir);
    tinylog2   = new piece(sx, sy, x + width*3.5, y, width, height, dir);
    tinylog3   = new piece(sx, sy, x, y, width, height, dir);
    tinylog4   = new piece(sx, sy, 45, y2, width, height, dir*-1);
    tinylog5   = new piece(sx, sy, 245, y2, width, height, dir*-1);
    pieces.push(tinylog1);
    pieces.push(tinylog2);
    pieces.push(tinylog3);
    pieces.push(tinylog4);
    pieces.push(tinylog5);
}

function all_biglogs(sx, sy, x, y, width, height, dir){
    biglog1   = new piece(sx, sy, x, y, width, height, dir);
    biglog2   = new piece(sx, sy, x + width*1.2, y, width, height, dir);
    biglog3   = new piece(sx, sy, 100, 180, width, height, dir*-1);
    biglog4   = new piece(sx, sy, 333, 210, width, height, dir);
    pieces.push(biglog1);
    pieces.push(biglog2);
    pieces.push(biglog3);
    pieces.push(biglog4);
}

function piece(sx, sy, x, y, w, h, direction){
    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.d = direction; // for automated animations
    
    this.draw = draw;
    function draw(context){
	context.drawImage(sprite, this.sx, this.sy, this.w, this.h, this.x,
			  this.y, this.w, this.h);
    }
    this.update = update;
    function update(){
	this.x = this.x + (this.w*(1/2)*this.d);
	this.checkx();
    }
    this.move = move;
    function move(dir){
	if(dir == right || dir == left){
	    this.x = this.x + this.w/2*dir;
	} else if(dir == up || dir == down){
	    dir = dir/2;
	    this.y = this.y + this.h/2*dir;
	    calc_score(moveup);
	    if (lillipad() == true) { 
		calc_score(froghome); 
	    }
	}
	if (collide() == true) {
	    alert("you lose");
	}
    }
    this.collide = collide;
    function collide(){
	if(this.x < 0 || this.x > canvasx) {
	    return true;
	} else if (this.y < 0 || this.y > canvasy) {
	    return true;
	} 
	return false;
    }
    this.collision = collision;
    function collision(){
	for(j = this.x; j<this.x + this.w; j++){
	    for(k = this.y; k<this.y + this.h; k++){
		if(frogger.x == j && frogger.y == k) {
		    alert("collision");
		}
	    }
	}
    }
    this.checkx = checkx;
    function checkx(){
	if(this.x < 0) { this.x = canvasx; }
	if(this.x > canvasx) { this.x = 0; }
    }
    this.checky = checky;
    function checky(){
	if(this.y < 0) { this.y = canvasy; }
	if(this.y > canvasy) { this.y = 0; } 
    }
}

function calc_score(points){
    score += points;
    if(frogs != 0 && frogs%5 == 0) {
	score += fivefrogs;
    }
}

function lillipad(){
    lillipadx = new Array(12, 23, 99, 100, 187, 264, 265, 275, 276, 352, 353);
    lillipady = 85;
    for(i = 0; i < lillipadx.length; i++){
	if((frogger.x == lillipadx[i]-1 || 
	    frogger.x == lillipadx[i]   || 
	    frogger.x == lillipadx[i]+1) && frogger.y >= lillipady) {
	    alert("froggger made it home.");
	    return true;
	}
    } if (frogger.y == lillipady) {
	alert("collision. die frog die.");
    }
    return false;
}

function collision_check(){
    console.log("collision_check");
}

function draw_game(){
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    draw_board(context);
    draw_images(context);
}

function draw_board(context){
    context.fillStyle = "#191970";
    context.fillRect (0, 0, 400, 275);
    context.fillStyle = "#000000";
    context.fillRect (0, 275, 400, 300);
}

function draw_images(context){
    draw_images_static(context);
    update_kinetic();
    frogger.collide();
    draw_images_kinetic(context);
    draw_images_froglives(context);
}

function draw_images_static(context){
    context.drawImage(sprite, 14, 12, 320, 40, 14, 12, 340, 40); // title
    context.drawImage(sprite, 0, 55, 399, 50, 0, 55, 399, 50);   // marsh
    context.drawImage(sprite, 0, 118, 399, 35, 0, 275, 399, 35); // road
    context.drawImage(sprite, 0, 118, 399, 35, 0, 485, 399, 35); // road
    draw_images_static_text(context);
}

function draw_images_static_text(context){
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


function update_kinetic(){
    for(i=1; i<pieces.length; i++){
	pieces[i].update();
	pieces[i].collision();
    }
}

function draw_images_kinetic(context){
    for(i=0; i<pieces.length; i++){
	pieces[i].draw(context);
    }
}

function draw_images_froglives(context){
    for(var i = 0; i < lives-1; i++){
	context.drawImage(sprite, 13, 335, 27, 20, i*25, 520, 25, 15);
    }
}