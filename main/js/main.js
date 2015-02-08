var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

// Information to be printed out
var i_x = document.getElementById("i_x");
var i_y = document.getElementById("i_y");
var i_movement = document.getElementById("i_movement")

var user;
var keys = [];

var HEIGHT = canvas.height;
var WIDTH = canvas.width;

var background_image;
var background_width = 2000;
var background_height = 300;
var background_1_x = 100;
var background_1_y = 100;
var background_2_x = background_1_x - background_width;
var background_2_y = background_1_y;

function user(x, y){
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.speed = 5;
    
    this.sprite;
    
    this.sprite_list = new Array();
//    this.sprite_resting;
//    this.sprite_jumping;
    
    this.walking = false;
    this.jumping = false;
    this.landed = true;
    this.custom = false;    // is character currently using custom sprites
    this.custom_i = 0;      // current index of the custom sprite
    
    this.walking_loop;
    this.walking_frame = 0;
    this.left_walking_sprite_list = new Array();
    this.right_walking_sprite_list = new Array();
    
    this.draw = function(){
        ctx.putImageData(this.sprite, this.x, this.y);
    }
    
    // TODO
    // custom animations that are binded to keystrokes

    this.custom_sprite = new Array();
    
}

// @param frames - an array of imgData
//function animation(frames){
//    this.frames = frames;
//}


// SETTINGS

var show_information = true;

var x_min = 400;                // the minimum x-value before the background scrolls
var x_max = 800;                // the maximum x-value before the background scrolls
var ground_level = 600;         // ground level measured from the top of the page
var friction = 0.8;
var gravity = 0.5;
var walking_interval = 1000;     // the delay before the frame for a walking animation changes


                                                                                                                //////////// MAIN

var _args = {};
var hab = hab || (function(){
    return {
        init : function(Args) {
            // Acquire args from HTML if necessary
            _args = Args;
        },
        start : function(){
            main();
            // BEGIN GAMELOOP
            (function() {
                var requestAnimationFrame = window.requestAnimationFrame || 
                                            window.mozRequestAnimationFrame || 
                                            window.webkitRequestAnimationFrame || 
                                            window.msRequestAnimationFrame;
                window.requestAnimationFrame = requestAnimationFrame;
            })();
        }
    };
}());

function main(){
    // Clear the canvas and resize it
    resize_canvas();
    
    // TODO
    // Modularize this later
    background_img = new Image();
    background_img.src = "img/bg_1.jpg";
    
    user = new user(200, ground_level);
    
    // push sprites for the character to use
    // 0 - resting sprite
    // 1 - jumping sprite
    user.sprite_list.push(color_to_imgdata("blue", 50, 50));
    user.sprite_list.push(color_to_imgdata("red", 50, 50));
    
    user.left_walking_sprite_list.push(color_to_imgdata("green", 50, 50));
    user.left_walking_sprite_list.push(color_to_imgdata("yellow", 50, 50));
    
    user.right_walking_sprite_list.push(color_to_imgdata("orange", 50, 50));
    user.right_walking_sprite_list.push(color_to_imgdata("purple", 50, 50));
    
    user.custom_sprite.push(color_to_imgdata("rgba(0,0,0,100)", 50, 50));
    user.custom_sprite.push(color_to_imgdata("red", 50, 50));
    user.custom_sprite.push(color_to_imgdata("orange", 50, 50));
    user.custom_sprite.push(color_to_imgdata("yellow", 50, 50));
    user.custom_sprite.push(color_to_imgdata("green", 50, 50));
    user.custom_sprite.push(color_to_imgdata("blue", 50, 50));
    user.custom_sprite.push(color_to_imgdata("purple", 50, 50));
    
    user.sprite = user.sprite_list[0];
//    user.sprite = url_to_imgdata("img/sprite_1.png", 50, 50); // contamination by cross-origin data, won't work on chrome
    
    init_keyboardevents();
    
    window.addEventListener("load", function(){
        update();
    });
}
                                                                                                                //////////// DRAWING and UPDATE

function update(){
    update_movement();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();
    
    draw_background();
    user.draw();
    // TODO
    // draw_foreground();
    
    // Update information to draw to the screen for debugging
    update_information();
    requestAnimationFrame(update);
}

function draw_background(){
    ctx.drawImage(background_img, background_1_x, background_1_y, background_width, background_height);
    ctx.drawImage(background_img, background_2_x, background_2_y, background_width, background_height);
}


                                                                                                                //////////// USER MOVEMENT

//function move(value){
//    if (value > 0){
//        // Moving in the RIGHT direction
//        if (user.x >= x_max){
//            background_1_x -= value;
//        } else {
//            user.x += value;
//        }
//    } else {
//        // Moving in the lEFT direction
//        if (user.x <= x_min){
//            background_x -= value;
//        } else {
//            user.x += value;
//        }
//    }
//}

function move(value){
    if (value > 0){
        // Moving in the RIGHT direction
        if (user.x >= x_max){
            // bg_x DECREASING
            
            background_1_x -= value;
            
            if (background_1_x < 0){
                background_2_x = background_1_x;
                background_1_x = background_1_x + background_width;
            } else {
                background_2_x = background_1_x - background_width;
            }
            
        } else {
            user.x += value;
        }
    } else {
        // Moving in the lEFT direction
        if (user.x <= x_min){
            // bg_x INCREASING
            background_1_x -= value;
            
            if (background_1_x > WIDTH){
                background_1_x = background_2_x;
            }
            
            background_2_x = background_1_x - background_width;
            
            
        } else {
            user.x += value;
        }
    }
}

function update_movement(){
    if (keys[38] || keys[32]) {
        // up arrow or space
        if(!user.jumping){
            user.jumping = true;
            user.velY = -user.speed*2;
            user.sprite = user.sprite_list[1];
            clearInterval(user.walking_loop);
            
            
            console.log("Jumping");
            i_movement.innerHTML = "movement: Jumping";
        }
    }
    
    if (keys[39]) {
        //console.log("right");
        // right arrow
        if (!user.walking){
            user.walking = true;
            console.log("Moving Right");
            i_movement.innerHTML = "movement: Moving Right";
        
            if (!user.jumping){
                clearInterval(user.walking_loop);
                next_walking_frame(0);
                user.walking_loop = setInterval(function(){
                        next_walking_frame(0);
                    }, walking_interval
                )
            }
        }
        
        if (user.velX < user.speed) {                         
            user.velX++;                  
        }
    }
    if (keys[37]) {   
        //console.log("left");              
        // left arrow
        if (!user.walking){
            user.walking = true;
            console.log("Moving Left");
            i_movement.innerHTML = "movement: Moving Left"; 
            
            if (!user.jumping){
                clearInterval(user.walking_loop);
                next_walking_frame(1);
                user.walking_loop = setInterval(function(){
                        next_walking_frame(1);
                    }, walking_interval
                )
            }
        }
                 
        if (user.velX > -user.speed) {
            user.velX--;
        }
    }
    
    // The character is not moving
    if (!keys[39] && !keys[37] && !user.jumping){
        clearInterval(user.walking_loop);
        if (user.walking){
            user.walking = false;
            console.log("Resting");
            i_movement.innerHTML = "movement: Resting"; 
            user.sprite = user.sprite_list[0];
        }
    }
    
    user.velX *= friction;
    
    if (user.jumping){
        user.velY += gravity;
    }
    
    move(user.velX);
    
    user.y += user.velY;
    
    // ground_level + gravity 
    if (user.y > ground_level) {
        user.y = ground_level;
        
        if (user.jumping){
            user.landed = true;
            console.log("Landed");
            
            if (keys[39]) { // RIGHT
                next_walking_frame(0);
                user.walking_loop = setInterval(function(){
                        next_walking_frame(0);
                    }, walking_interval
                )
                console.log("Moving Right");
                i_movement.innerHTML = "movement: Moving Right";
            }
            
            if (keys[37]) { // LEFT
                next_walking_frame(1);
                user.walking_loop = setInterval(function(){
                        next_walking_frame(1);
                    }, walking_interval
                )
                console.log("Moving Left");
                i_movement.innerHTML = "movement: Moving Left"; 
            }
                    
            // Return to resting sprite
            //user.sprite = user.sprite_list[0];
                
        }
        user.jumping = false;

    }
    
}

// @param: orientation {1:LEFT, 0:RIGHT} for which direction the character is moving
function next_walking_frame(orientation){
    if (orientation == 1){
        //console.log(user.left_walking_sprite_list.length);
        user.walking_frame = (user.walking_frame + 1) % user.left_walking_sprite_list.length;
        console.log(user.walking_frame);
        user.sprite = user.left_walking_sprite_list[user.walking_frame];
    } else {
        user.walking_frame = (user.walking_frame + 1) % user.right_walking_sprite_list.length;
        user.sprite = user.right_walking_sprite_list[user.walking_frame];
    }
    console.log("next_walking_frame");
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



                                                                                                                //////////// UTILITY FUNCTIONS

function init_keyboardevents(){
//    window.addEventListener('keydown', key_events, false);
    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
        
        //console.log(e.keyCode);
        // animation codes are 1 indexed, valid commands are thus 1,2,3,4,5,6,7,8,9
        if (e.keyCode > 48 && e.keyCode < 58){
            var i = e.keyCode - 48;
            if (i <= user.custom_sprite.length){
                if (i != user.custom_i){
                    console.log("custom_sprite: " + i);
                    user.sprite = user.custom_sprite[i-1];
                    user.custom_i = i;
                }
            }
            user.custom = true;
        }
        
        
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
        // animation codes are 1 indexed, valid commands are thus 1,2,3,4,5,6,7,8,9
        if (e.keyCode > 48 && e.keyCode < 58){
            var i = e.keyCode - 48;
            if (i <= user.custom_sprite.length){
                user.sprite = user.sprite_list[0];
                user.custom_i = 0;
            }
        }
    });
}

function resize_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    HEIGHT = canvas.height;
    WIDTH = canvas.width;
}

function update_information(){
    i_x.innerHTML = "x: " + user.x;
    i_y.innerHTML = "y: " + user.y;
}

function get_color_string(r, g, b, a){
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}