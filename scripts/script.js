import Character from "./character.js"

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 700;

const bgCity = new Image();  // width, height
bgCity.src = "img/backgrounds/city.png";
const cityStreet = new Image();  // width, height
cityStreet.src = "img/Utility/cityStreet.jpg";

const keys = [];
const shots = [];
const enemies = [];
const imgs = [];

//!new Audio('audio/music/the_end_piano.mp3').play()
//!
let audio = new Audio();
audio.src = 'audio/music/the_end_piano.mp3';
audio.play;

let hit1 = new Audio();
hit1.src = '.\audio\effects\hit1.mp3';
hit1.play;
// Sound
// Documentation:
//!
//!


// Sound takes three arguments. The source url of the sound, the volume (from 0 to 100), and the loop (true to loop, false not to loop).
// stop allow to start after (contrary to remove).
// init re-set the argument volume and loop.

// Example:

// var foo = new Sound("url", 100, true);
// foo.start();
// foo.stop();
// foo.start();
// foo.init(100, false);
// foo.remove();



imgs.push("img/backgrounds/virus2.jpg");
imgs.push("img/backgrounds/virus3.webp");
imgs.push("img/backgrounds/virus4.jpg");
imgs.push("img/backgrounds/virus5.webp");
imgs.push("img/backgrounds/virus6.jpg");
imgs.push("img/backgrounds/virus7.jpg");
imgs.push("img/backgrounds/virus8.png");

const gameTitle = "Covid19 - The Last Hope";
let str1 = gameTitle
let str2 = "The year is 2072 and the covid19 virus has been" 
let str3 = "causing havac on the Earth for more than 5 decades."
let str4 = "Throughout the year the virus has mutated countless of times"
let str5 = "and more than 99% of earth population is currently infected with the virus…"
let str6 = "Only one city remains uninfected with the virus - The Last Hope."
let str7 = "You are one of the citizens in The Last Hope and you have been tasked"
let str8 = "to guard the northern gates for the day."
let str9 = "Little do you know that a swarm of infected people" 
let str10 = "are on their way to The Last City."
let str11 = "If the gates are breached all hope for humanity is lost."
let str12 = "Be prepared for the longest day of your life"

const hero = new Character(200, 0, 3);

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
    constructor(_x, _y, _speed, _health, _enemyInterval, _enemySelect){
    this.width = 64; //  832 / 13 = 
    this.height = 64; //  1344 /21
    this.x = Math.random() * (canvas.width - 64);
    this.y = 0;
    this.frameX = 0; //Frame of spriteSheet
    this.frameY = 10;
    this.speed = _speed;
    this.enemyInterval = _enemyInterval;
    this.enemyTimer = 0;
    this.enemySelect = _enemySelect; //Enemy Sprites
    this.radius = 20;
    this.health = _health;
    //this.direction = Math.random - 0,5 // between 0,5 and -0,5
    }
    move() {
        this.y = this.y + this.speed;
    }
    show(){
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI, false); //int x, int y, int width, int height, int startAngle, int arcAngle
        ctx.fillStyle = "rgba(0, 255, 0, 0)";
        ctx.fill();

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.font = "22px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText(this.health, this.x, this.y - 25);
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
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
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
    if (keys[38] && hero.y > 250 || keys[87] && hero.y > 250){ //UP(38) W(87)
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

// console.log(keyStatus)

  function handlePlayerFrame(){
    if (hero.frameX < 8 && hero.moving === true) {
        hero.frameX++
    } else {
        hero.frameX = 0;
    }
}
function handleEnemyFrame(){
    for (let i = 0; i < enemies.length; i++){
        if (enemies[i].frameX < 8) {
            enemies[i].frameX++
        } else {
            enemies[i].frameX = 0;
        }
    }
}

let gameStats = {
    // cityHealth: 3,
     //allowedEnemiesOnScreen: 10,
    //enemyCount: 0,
    // levelEnemiesTotal: 5
};
let gameLevelCurrent = 0;

// let gameStats = [];
// class gameStat {
//     constructor(_levelNumber, _cityHealth, _levelEnemiesTotal, _enemySpeed){
//         this.levelNumber = _levelNumber, // intro --> controls
//         this.cityHealth = _cityHealth,
//         this.allowedEnemiesOnScreen = 1000,
//         this.enemyCount = 0,
//         this.levelEnemiesTotal = _levelEnemiesTotal,
//         this.enemySpeed = _enemySpeed,
//         this.levelCompleted = false
//     }
// }

let gameLevelStats = [
    {
    levelNumber: 0, // intro --> controls
    cityHealth: 5,
    allowedEnemiesOnScreen: 1000,
    enemyCount: 0,
    levelEnemiesTotal: 3,
    enemySpeed: 0.5,
    enemyHealth: 3,
    levelCompleted: false
    },
    {
     levelNumber: 1,
     cityHealth: 5,
     allowedEnemiesOnScreen: 1000,
     enemyCount: 0,
     levelEnemiesTotal: 10,
     enemySpeed: 1,
     enemyHealth: 3,
     levelCompleted: false
    },
    {
     levelNumber: 2,
     cityHealth: 5,
     allowedEnemiesOnScreen: 1000,
     enemyCount: 0,
     levelEnemiesTotal: 20,
     enemySpeed: 1.5,
     enemyHealth: 3,
     levelCompleted: false
    },
    {
    levelNumber: 3,
    cityHealth: 5,
    allowedEnemiesOnScreen: 1000,
    enemyCount: 0,
    levelEnemiesTotal: 20,
    enemySpeed: 1.5,
    enemyHealth: 3,
    levelCompleted: false
    },
    {
    levelNumber: 4,
    cityHealth: 5,
    allowedEnemiesOnScreen: 1000,
    enemyCount: 0,
    levelEnemiesTotal: 20,
    enemySpeed: 1.5,
    levelCompleted: false
    }

];

// Covid19 – The Last Hope
// The year is 2072 and the covid19 virus has been causing havac on the Earth for more than 5 decades.
// Throughout the year the virus has mutated countless of times and more than 99% of earth population is currently infected with the virus… 
// Only one city remains uninfected with the virus - “The Last Hope”.
// You are one of the citizens in The Last Hope and you have been tasked to guard the northern gates for the day. Little do you know that a swarm of infected people are on their way to The Last City. If the gates are breached all hope for humanity is lost.
// Be prepared for the longest day of your life
// User the arrows or (a, s, d, w) to move player
// Press spacebar to shoot
// City Healds is displayed in the bottom of the screen 


let gameStarted = false;

let lastTime = 1;
function animate(timeStamp){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    //Background rotation
    const img = document.getElementById("imgVirus")
    img.setAttribute("src", imgs[Math.floor(timeStamp / 5000 % imgs.length)]) //Math.floor(Math.random() * imgs.length)

    //Intro
    if (gameStarted === false){
        
        

        //Text
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "35px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText(str1, 300, 150);
        ctx.font = "16px Comic Sans MS";
        ctx.fillText(str2, 300, 220);
        ctx.fillText(str3, 300, 250);
        ctx.fillText(str4, 300, 310);
        ctx.fillText(str5, 300, 340);
        ctx.fillText(str6, 300, 370);
        ctx.fillText(str7, 300, 430);
        ctx.fillText(str8, 300, 460);
        ctx.fillText(str9, 300, 490);
        ctx.fillText(str10, 300, 520);
        ctx.fillText(str11, 300, 550);
        ctx.fillText(str12, 300, 610);

        //Mouse Click
        canvas.addEventListener("click", () => {
            gameStarted = true;
        });
        //Enter Key
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13){
                gameStarted = true;
            }
            });

    } else {    
    
        //Background and Scoreboard
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, canvas.height-100, scoreBoard.width, scoreBoard.height)

        ctx.drawImage(cityStreet, 0, 0, canvas.width , 600)
        ctx.drawImage(bgCity, 0, 400, canvas.width , 200)
        
        //Hero
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
            if (enemies.length !== 0){
            for (let j = 0; j < enemies.length; j++){
                let distance = Math.sqrt(Math.pow((shots[i].x - enemies[j].x),2) + Math.pow((shots[i].y - enemies[j].y),2));
                if (distance <= (shots[i].radius + enemies[j].radius)){
                    //ENEMY HIT
                    //hit1.play;
                    shots.splice(i, 1);
                    enemies[j].health--
                        if(enemies[j].health <= 0){
                            enemies.splice(j, 1);
                        }
                    break;
                }
            }
            } 
        }

        //Enemies
        if (!enemies.length && 
            gameLevelStats[gameLevelCurrent].enemyCount < gameLevelStats[gameLevelCurrent].levelEnemiesTotal && 
            gameLevelStats[gameLevelCurrent].levelCompleted === false){
            const enemy = new Enemy (200, 100, gameLevelStats[gameLevelCurrent].enemySpeed, gameLevelStats[gameLevelCurrent].enemyHealth, 50, Math.floor((Math.random() * (characterSprites.length))))
            enemies.push(enemy);
            gameLevelStats[gameLevelCurrent].enemyCount++  
        }
        for (let i = 0; i < enemies.length; i++){

            enemies[i].show();
            drawSprite(characterSprites[enemies[i].enemySelect], enemies[i].width * enemies[i].frameX, enemies[i].height * enemies[i].frameY, enemies[i].width, enemies[i].height, enemies[i].x - 32, enemies[i].y - 32, enemies[i].width, enemies[i].height)
            enemies[i].move();

            if (i === enemies.length - 1 && 
                    enemies.length < gameLevelStats[gameLevelCurrent].allowedEnemiesOnScreen && 
                    enemies[i].enemyInterval < enemies[i].enemyTimer &&
                    gameLevelStats[gameLevelCurrent].enemyCount < gameLevelStats[gameLevelCurrent].levelEnemiesTotal){
                const enemy = new Enemy(200, 100, gameLevelStats[gameLevelCurrent].enemySpeed, gameLevelStats[gameLevelCurrent].enemyHealth, 50, Math.floor((Math.random() * (characterSprites.length))))
                enemies.push(enemy);
                gameLevelStats[gameLevelCurrent].enemyCount++
            } else {
                enemies[i].enemyTimer++
            }

            if (enemies[i].y > 550){
                enemies.splice(i, 1);
                gameLevelStats[gameLevelCurrent].cityHealth--;
            }
        }

        //Check Win
        if (gameLevelStats[gameLevelCurrent].enemyCount >= gameLevelStats[gameLevelCurrent].levelEnemiesTotal && //Number of enemies been present
            enemies.length === 0 && //enemies array is empty
            gameLevelStats[gameLevelCurrent].cityHealth > 0){ //City is still alive
            
            gameLevelStats[gameLevelCurrent].levelCompleted = true;
            
        } else if (gameLevelStats[gameLevelCurrent].cityHealth <= 0){
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.font = "35px Comic Sans MS strong";
            ctx.textAlign = "center";
            //ctx.rotate(20 * Math.PI / 180);
            ctx.fillText("The city has been infected with Corona", 300, 400);
            ctx.fillText("You Lose", 300, 350);
            
            // const youLose = new Image();
            // youLose.src = "img/Utility/youLose.png";
            //ctx.drawImage(youLose, 0, 100, canvas.width , 400)
        }
        ctx.fillText("City Health: " + gameLevelStats[gameLevelCurrent].cityHealth, 100, 620);

        if (gameLevelStats[gameLevelCurrent].levelCompleted === true){
            
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.font = "25px Comic Sans MS";
            ctx.textAlign = "center";
            ctx.fillText("Level Cleared", 300, 400);
            ctx.font = "18px Comic Sans MS";
            ctx.textAlign = "center";
            ctx.fillText(`Press ENTER to start level ${gameLevelStats[gameLevelCurrent].levelNumber + 1} `, 300, 450);
        }

            document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13){
                if ( gameLevelStats[gameLevelCurrent].levelCompleted === true){
                         gameLevelCurrent++;
                }
            }
            });
    };

    handlePlayerFrame();
    handleEnemyFrame();

    requestAnimationFrame(animate);
};
animate(0);


