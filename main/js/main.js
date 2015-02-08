(function() {
    var requestAnimationFrame = window.requestAnimationFrame || 
                                window.mozRequestAnimationFrame || 
                                window.webkitRequestAnimationFrame || 
                                window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

// Information to be printed out
var i_x = document.getElementById("i_x");
var i_y = document.getElementById("i_y");

var user;
var keys = [];

var HEIGHT = canvas.height;
var WIDTH = canvas.width;

var background_image;
var background_x;
var background_y;


function user(x, y){
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.speed = 3;
    
    this.sprite;
    this.animation_set = {};
    
    this.walking = false;
    this.jumping = false;
    this.jump_frame = 0;
    
    this.draw = function(){
        ctx.putImageData(this.sprite, this.x, this.y);
    }
    this.add_animation = function(name, animation){
        this.animation_set[name] = animation;    
    }
}

// @param frames - an array of imgData
function animation(frames){
    this.frames = frames;
}


// SETTINGS

var show_information = true;

var x_min = 400;      // the minimum x-value before the background scrolls
var x_max = 800;      // the maximum x-value before the background scrolls
var ground_level = 800;     // ground level measured from the top of the page
var friction = 0.8;
var gravity = 0.3;




// MAIN

var _args = {};
var hab = hab || (function(){
    return {
        init : function(Args) {
            _args = Args;
        },
        start : function(){
            main();
        }
    };
}());

function main(){
    // Clear the canvas and resize it
    resize_canvas();
    
    background_img = new Image();
    background_img.src = "img/bg_1.jpg"
    background_x = 100;
    background_y = 100;
    
    user = new user(200, ground_level);
//    ctx.fillStyle = "red";
//    ctx.fillRect(10, 10, 50, 50);
//    user.sprite = ctx.getImageData(10,10,50,50);
    user.sprite = color_to_imgdata("blue", 50, 50);
//    user.sprite = url_to_imgdata("img/sprite_1.png", 50, 50); // contamination by cross-origin data
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    var data = user.sprite.data;
    
    init_keyboardevents();
}

function init_keyboardevents(){
//    window.addEventListener('keydown', key_events, false);
    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
}

function update_movement(){
    if (keys[38]) {
       // up arrow
    }
    if (keys[39]) {
        // right arrow
        console.log("Moving Right");
        if (user.velX < user.speed) {                         
            user.velX++;                  
        }          
    }          
    if (keys[37]) {                 
        // left arrow        
        console.log("Moving Left");          
        if (user.velX > -user.speed) {
            user.velX--;
        }
    }
    if (keys[38] || keys[32]) {
        // up arrow or space
        if(!user.jumping){
            user.jumping = true;
            user.velY = -user.speed*2;
        }
    }
        
    user.velX *= friction;
    user.velY += gravity;
    
    move(user.velX);
    user.y += user.velY;
    
    if (user.y >= ground_level) {
        user.y = ground_level;
        user.jumping = false;
    }
    
}

//////////// DRAWING

function update(){
    console.log("updating");
    update_movement();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();
    
    draw_background();
    user.draw();
    
    // Update information to draw to the screen for debugging
    update_information();
    requestAnimationFrame(update);
}

function draw_background(){
    ctx.drawImage(background_img, background_x, background_y, 2000, 300);
}

//////////// UTILITY FUNCTIONS

function resize_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update_information(){
    i_x.innerHTML = "x: " + user.x;
    i_y.innerHTML = "y: " + user.y;
}

function get_color_string(r, g, b, a){
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

//////////// USER MOVEMENT

function move(value){
    if (value > 0){
        // Moving in the RIGHT direction
        if (user.x >= x_max){
            background_x -= value;
        } else {
            user.x += value;
        }
    } else {
        // Moving in the lEFT direction
        if (user.x <= x_min){
            background_x -= value;
        } else {
            user.x += value;
        }
    }
}

function jump(){
    user.is_jumping = true;
}

//////////// IMGDATA

// call these at the start of main
// Setting height or width to -1 creates a sprite with the original height/width
// @return returns an imgdata object given a url
function url_to_imgdata(url, height, width){
    var imgData;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = url;
    
    img.onload = function(){
        if (height == -1 || width == -1){
            ctx.drawImage(img, 0, 0);
            imgData = ctx.getImageData(0, 0, img.width, img.height);
        } else {
            ctx.drawImage(img, 0, 0, width, height);
            imgData = ctx.getImageData(0, 0, width, height);
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return imgData;
    }
}

// @param: color is a string for a particular color, eg. red
function color_to_imgdata(color, width, height){
    var imgData;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    imgData = ctx.getImageData(0, 0, width, height);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return imgData;
}

window.addEventListener("load", function(){
  update();
});
