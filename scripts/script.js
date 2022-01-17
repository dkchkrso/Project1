import Character from "./character.js"

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 700;

const keys = [];
const shots = [];

const hero = new Character(200, 0, 5);

const playerSprite = new Image();
playerSprite.src = "img/characters/hero.png";


const background = new Image();  // width, height
background.src = "img/backgrounds/test2.png";

const scoreBoard = {
    width: canvas.width,
    height: 100
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}



// -- Alternative for animation - start --
// function animate(){
//     ctx.clearRect(0,0,canvas.width, canvas.height)
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//     drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
//     movePlayer();
//     handlePlayerFrame();
//     requestAnimationFrame(animate);
// }

// animate();
// -- Alternative for animation - stop --


// -- Alternative for keyCode - start --
// window.addEventListener('keydown', (e) => {
//     switch (e.keyCode) { //e.key is replacing
//       case 38: // up arrow
//         player.speedY -= 1;
//         break;
//       case 40: // down arrow
//         player.speedY += 1;
//         break;
//       case 37: // left arrow
//         player.speedX -= 1;
//         break;
//       case 39: // right arrow
//         player.speedX += 1;
//         break;
//     }
//   });
// window.addEventListener('keyup', (e) => {
//     player.speedX = 0;
//     player.speedY = 0;
//   });
// -- Alternative for keyCode - stop --


window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    hero.moving = true;
    //console.log(keys) //Find keyCode in console.log
});
window.addEventListener("keyup", function(e){
    delete keys [e.keyCode];
    hero.moving = false;
});

class Shot {
    constructor(_speed, _frequency){
        this.x = hero.x + hero.width * .5 ;
        this.y = canvas.height - 150;
        this.width = 8; //  832 / 13 
        this.height = 8; //  1344 /21
        this.speed = _speed;
        this.frequency = _frequency;
        this.creationTime = Date.now();
    }
    show(){
        ctx.beginPath();
        ctx.arc(this.x , this.y, 8, 0, 2 * Math.PI, false); //int x, int y, int width, int height, int startAngle, int arcAngle
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fill();
    }
    move(){
        this.y -= this.speed
    }
}

//up left down right
//spellcast * 4 [0 - 3]
//thrust * 4 [4 - 7]
//walk * 4 [8 - 11]
//slash * 4 [12 - 15]
//shoot * 4 [16 - 19]
//hurt * 1 [20]
//smash * 1 [21]

function actionHero(){
    if (keys[38] && hero.y > 400 || keys[87] && hero.y > 400){ //UP(38) W(87)
        hero.y -= hero.speed;
        hero.frameY = 8;
        hero.moving = true;
    }
    if (keys[37] && hero.x > 0 || keys[65] && hero.x > 0){ //LEFT(37) W(65)
        hero.x -= hero.speed;
        hero.frameY = 9;
        hero.moving = true;
    }
    if (keys[40] && hero.y < canvas.height - hero.height - 100 || 
        keys[83] && hero.y < canvas.height - hero.height - 100){ //DOWN(40) W(83)
        hero.y += hero.speed;
        hero.frameY = 10;
        hero.moving = true;
    }
    if (keys[39] && hero.x < canvas.width - hero.width || 
        keys[68] && hero.x < canvas.width - hero.width ){ // RIGHT(39) D(68) 
        hero.x += hero.speed;
        hero.frameY = 11;
        hero.moving = true;
    }
    // if (keys[32]){  // SPACEBAR(32)
    //     //Add new shot to array
    //     let shotCount = shots.length
    //     let shot = new Shot(1)
    //     shots.push(shot);
    //     console.log("test")
    //     console.log(shot)
    //     console.log(shots)
    // }
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32){
        //Allow now shot?
        switch (shots.length){
            case 0:
                let shot = new Shot(1, 1);
                shots.push(shot);
                break;
            
            default:
                if (Date.now() - shots[shots.length - 1].creationTime > shots[shots.length - 1].frequency){
                    let shot = new Shot(1, 1)
                    shots.push(shot);
                }    
        }
    }
});

  function handlePlayerFrame(){
    if (hero.frameX < 8 && hero.moving === true) {
        hero.frameX++
    } else {
        hero.frameX = 0;
    }
}

setInterval(function(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, canvas.height-100, scoreBoard.width, scoreBoard.height)

    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height -100);
    ctx.drawImage(background, 0, 400, canvas.width , 200)
    drawSprite(playerSprite, hero.width * hero.frameX, hero.height * hero.frameY, hero.width, hero.height, hero.x, hero.y, hero.width, hero.height)
    actionHero();
    for (let i = 0; i < shots.length; i++){
        
        shots[i].show();
        shots[i].move();
        if (shots[i].y < 10){ //array clean up
            shots.splice(i, 1);
        }
    }
    handlePlayerFrame();
}, 10);