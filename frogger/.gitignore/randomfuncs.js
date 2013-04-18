/*****************USER INPUT AND MOVE FROGGER*************/

function move(event){
    if(event.keyCode == 37){
	move_frogger(-1, 0);
    } else if (event.keyCode == 38) {
	move_frogger(0, -1);
    } else if (event.keyCode == 39) {
	move_frogger(1, 0);
    } else if (event.keyCode == 40) {
	move_frogger(0, 1);
    } else if (event.keyCode == 81) {
	gameOver = true;
    } else {
	pause();
    }
}

function pause(){
    // stop the game animations. temporarily. 
}

function move_frogger(xmov, ymov){
    newx = frogger.x + frogger.width*xmov;
    newy = frogger.y + frogger.height*ymov;
    if(bounds_check(newx, newy, frogger)){
	frogger.x = newx;
	frogger.y = newy;
    }
}

function bounds_check(x, y, elem){
    if(x < 0 || y < 0)
	return false;
    else if(x > 399 || y > 565)
	return false;
    else if(collision_check(x, y, elem)){
	return false;
    } else
	return true;
}

function collision_check(x, y, elem){
    // check if two "boxes" intersect
}

/****************ANIMATIONS AND DRAW BOARD******************/
// logic works like this: variables get updated and then draw Board
// is the same every single time. 
// so basically, kinetic();
function kinetic(){
    biglogs.animate();
    pinkcar.animate();
    racecar.animate();
    truck.animate();
}

function elem(){
    function animate(){
	setInterval(this.draw(), 750);
    }
}



