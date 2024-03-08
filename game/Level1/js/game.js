/* Unused, modules wont work with certain extensions
import GameObject from "./GameObject.js";
import SpaceShip from "./GameObject.js";
*/


// gameobject class to use for all game objects
class GameObject {
   constructor(x, y, width, height, color) {
      // object position
      this.x = x;
      this.y = y;
      
      // object size 
      this.width = width;
      this.height = height;
      
      this.color = color;
   }
   
   draw(ctx) { // draw the object on the canvas
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height); // can be changed later to use a sprite instead of a rectangle
   }

   // object movement
   update(dx, dy) {
      this.x += dx;
      this.y += dy;
   }

   // object collision detection
   collidesWith(obj) {
      return (this.x < obj.x + obj.width
               && this.x + this.width > obj.x
               && this.y < obj.y + obj.height 
               && this.y + this.height > obj.y);
   }
}

class Bullet extends GameObject {
  constructor(x, y, width, height, color, dy) {
    super(x, y, width, height, color);
    // Set the bullet's y direction.
    this.dy = dy;
  }
  
  update(x, y) {
    this.y += this.dy; 
  }
}

class SpaceShip extends GameObject {
   constructor(x, y, width, height, color, canvasHeight) {
      super(x, y, width, height, color);
      
      // getting canvas height
      this.canvasHeight = canvasHeight;
      
      // setting the player's bullet size
      this.bulletWidth = 4; // arbitrary
      this.bulletHeight = 8; // arbitrary
      
      // setting the player's bullet color
      this.bulletColor = "#ff0000";
      
      // array of bullets 
      this.bullets = [];
      
   }
   
   
   // drawing the player's bullets
   draw(ctx) {
      super.draw(ctx);
      
      for (var i = 0; i < this.bullets.length; i++) {
         this.bullets[i].draw(ctx);
         this.bullets[i].update(0, 0);
         
         // check if the bullets are out of bounds
         if (this.bullets[i].y < 0 || this.bullets[i].y > this.canvasHeight) {
            // delete the bullets 
            this.bullets.splice(i, 1);
         }  
      }
   }
   
   // player shoot bullets function
   shoot(dy) {
      this.bullets.push(new Bullet(
         this.x + this.width / 2 - this.bulletWidth / 2,
         this.y - this.bulletHeight,
         this.bulletWidth,
         this.bulletHeight,
         this.bulletColor,
         dy
      ));
   }
}

class Player extends SpaceShip {
   constructor(x, y, width, height, color, canvasHeight, canvasWidth) {
      super(x, y, width, height, color, canvasHeight);
      this.canvasWidth = canvasWidth;
   }
   
   // updating player position
   update(dx, dy) {
      super.update(dx, dy);
      console.log(this.x);
      // make sure the player cant go out of bounds
      if (this.x < 0) {
         console.log("oob left");
         this.x = 0;
      } else if (this.x + this.width > this.canvasWidth) {
         console.log("oob right");
         this.x = this.canvasWidth - this.width;
      }
   }
}


var game = {};

game.canvas = document.getElementById('canvas');
game.ctx = game.canvas.getContext('2d');

game.backgroundColor = '#000000';


// update function, handles game loop
game.update = function() {
   game.ctx.fillStyle = game.backgroundColor;
   game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
   
   game.player.draw(game.ctx);
}

// player smooth movement loop
function moveLoop() {
   if (keyState[37] || keyState[65]){
      game.player.update(-2, 0);
   }    
   if (keyState[39] || keyState[68]){
      game.player.update(2, 0);
   }

   // redraw/reposition your object here
   // also redraw/animate any objects not controlled by the user

   

   setTimeout(moveLoop, 10);
}    




// handles specific button presses
game.keydown = function(e) {
   // If you press left, the character moves left
   if (e.keyCode == 37 || e.keyCode == 65) {
      game.player.update(-5, 0);
   }
   // If the right arrow key is pressed, move the player right.
      else if (e.keyCode == 39 || e.keyCode == 68) {
      game.player.update(5, 0);
   }
}

// function runs when the game starts
game.init = function() {
   
   game.interval = setInterval(game.update, 1000 / 60);
   
   // setting up the player
   game.player = new Player(
      game.canvas.width / 2 - 50,
      game.canvas.height - 50,
      20,
      20,
      "#FFFFFF",
      game.canvas.height,
      game.canvas.width
   );
   
   moveLoop();
   
   
}

// function runs when the game ends
game.stop = function() {
   clearInterval(game.interval);
}

// function restarts the game
game.restart = function() {
   game.stop();
   game.init();
}


// start the game when the window loads

window.onload = game.init;

var keyState = {};    

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    


window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);


//window.onkeydown = game.keydown;

