import Character from "./character.js"

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 700;

const background = new Image();  // width, height
background.src = "img/backgrounds/test2.png";

const keys = [];
const shots = [];
const enemies = [];

const hero = new Character(200, 0, 5);

const playerSprite = new Image();
playerSprite.src = "img/characters/hero.png";

const characterSprites = []
const bowlerSprite = new Image();
bowlerSprite.src = "img/characters/bowler.png"
characterSprites.push(bowlerSprite)
const greenSprite = new Image();
greenSprite.src = "img/characters/green.png"
characterSprites.push(greenSprite)
const redCoinSprite = new Image();
redCoinSprite.src = "img/characters/redCoin.png"
characterSprites.push(redCoinSprite)
const redSprite = new Image();
redSprite.src = "img/characters/red.png"
characterSprites.push(redSprite)

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

class Enemy {
    constructor(_x, _y, _speed, _enemyInterval, _enemySelect){
    this.width = 64; //  832 / 13 = 
    this.height = 64; //  1344 /21
    this.x = Math.random() * (canvas.width - 64);
    this.y = 0;
    this.frameX = 0; //Frame of spriteSheet
    this.frameY = 3;
    this.speed = _speed;
    this.enemyInterval = _enemyInterval;
    this.enemyTimer = 0;
    this.enemySelect = 0; //default enemy selection
    this.radius = 20;
    //this.direction = Math.random - 0,5 // between 0,5 and -0,5
    }
    move() {
        this.y++;
    }
    show(){
        
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI, false); //int x, int y, int width, int height, int startAngle, int arcAngle
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.fill();

        // ctx.fillStyle = "rgb(0, 255, 0)"
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const scoreBoard = {
    width: canvas.width,
    height: 100
}

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
        this.y = hero.y;
        this.width = 8; //  832 / 13 
        this.height = 8; //  1344 /21
        this.speed = _speed;
        this.frequency = _frequency;
        this.creationTime = Date.now();
        this.radius = 8;
    }
    show(){
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI, false); //int x, int y, int width, int height, int startAngle, int arcAngle
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
let keyStatus = "up";
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32){
        //Allow new shot?
        switch (shots.length){
            case 0:
                let shot = new Shot(10, 1);
                shots.push(shot);
                keyStatus = "down";
                break;

            
            default:
                if (Date.now() - shots[shots.length - 1].creationTime > shots[shots.length - 1].frequency && keyStatus === "up"){
                    let shot = new Shot(10, 1)
                    shots.push(shot);
                    keyStatus = "down";
                }    
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32){
        keyStatus = "up"
    }
});

console.log(keyStatus)

  function handlePlayerFrame(){
    if (hero.frameX < 8 && hero.moving === true) {
        hero.frameX++
    } else {
        hero.frameX = 0;
    }
}

let allowedEnemiesOnScreen = 2;
let enemyCount = 0;
let levelEnemiesTotal = 3;
    
let lastTime = 1;
function animate(timeStamp){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //console.log(deltaTime);

    ctx.fillStyle = 'grey';
    ctx.fillRect(0, canvas.height-100, scoreBoard.width, scoreBoard.height)

    ctx.drawImage(background, 0, 400, canvas.width , 200)
    drawSprite(playerSprite, hero.width * hero.frameX, hero.height * hero.frameY, hero.width, hero.height, hero.x, hero.y, hero.width, hero.height)
    actionHero();

    //Shots
    for (let i = 0; i < shots.length; i++){
        shots[i].show();
        shots[i].move();
        //Check out of canvas
        if (shots[i].y < 3){ //array clean up
            shots.splice(i, 1);
            break;
        }
        //Check collision
         //if (enemies.length !== 0){
                 for (let j = 0; j < enemies.length; j++){
                 let distance = Math.sqrt(Math.pow((shots[i].x - enemies[j].x),2) + Math.pow((shots[i].y - enemies[j].y),2));
                 if (distance <= (shots[i].radius + enemies[j].radius))
                 
                    //Run Collision function
                    shots.splice(i, 1);
                    break;
                 //enemies[j]);
             } 
         //}
    }

    //Enemies
    if (!enemies.length && enemyCount <= levelEnemiesTotal){
        const enemy = new Enemy (200, 100, 50, 50, Math.floor((Math.random() * (characterSprites.length))))
        enemies.push(enemy);
        enemyCount++  
    }
    for (let i = 0; i < enemies.length; i++){
        //drawSprite(playerSprite, hero.width * hero.frameX, hero.height * hero.frameY, hero.width, hero.height, hero.x, hero.y, hero.width, hero.height)
        enemies[i].show();
        enemies[i].move();

        if (i === enemies.length - 1 && 
                  enemies.length < allowedEnemiesOnScreen && 
                  enemies[i].enemyInterval < enemies[i].enemyTimer &&
                  enemyCount <= levelEnemiesTotal){
            const enemy = new Enemy(200, 100, 50, 50, Math.floor((Math.random() * (characterSprites.length))))
            enemies.push(enemy);
            enemyCount++
        } else {
            enemies[i].enemyTimer++
        }

        if (enemies[i].y > 550){
            enemies.splice(i, 1);
        }
    }

    //Check Win/Lose
    if (enemyCount >= levelEnemiesTotal && enemies.length === 0){
        
        const youLose = new Image();
        youLose.src = "img/Utility/youLose.png";
        ctx.drawImage(youLose, 0, 100, canvas.width , 400)

    }

    // console.log("allowedEnemiesOnScreen " + allowedEnemiesOnScreen);
    // console.log("enemyCount " + enemyCount);
    // console.log("levelEnemiesTotal " + levelEnemiesTotal);
    // console.log("enemies " + enemies.length);
    // console.log("shots " + shots.length); 

    handlePlayerFrame();
    requestAnimationFrame(animate);
};
animate(0);


