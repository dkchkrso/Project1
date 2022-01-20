import Character from "./character.js"

//Variable deceleration



    //Canvas
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 700;

    //Game-mechanics
        //Variables and Arrays
        const keys = [];
        const shots = [];
        const enemies = [];
        const imgs = [];
        let gameLevelStats = [];
        const hero = new Character(200, 0, 3);
        let shotsFiredTotal = 0;
        let highScoreShotsFiredTotal = 0;
        let highScoreEnemiesKilledTotal = 0;
        let highScoreGameLevel = 0;
        let gameLevelCurrent = 0;
        let gameScreen = 1;
        let enemiesRemoved = 0;
        const cityHealthSet = 20
        let cityHealthNoReset = cityHealthSet;
        let enemiesKilledTotal = 0;
        

        let lastTime = 1;
    
            //Functions
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
        }
            //Classes
        class Enemy {
            constructor(_x, _y, _speed, _health, _enemyInterval, _enemySelect){
            this.width = 64; //  832 / 13 = 
            this.height = 64; //  1344 /21
            this.x = _x; //Math.random() * (canvas.width - 64);
            this.y = _y; //0;
            this.frameX = 0; //Frame of spriteSheet
            this.frameY = 10; //walking down
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
                //this.y = this.y + 10 * Math.sin(2);
            }
            show(){
                ctx.beginPath();
                ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI, false); //int x, int y, int width, int height, int startAngle, int arcAngle
                ctx.fillStyle = "rgba(0, 255, 0, 0)";
                ctx.fill();
        
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.font = "22px Comic Sans MS";
                ctx.textAlign = "center";
                ctx.fillText(this.health, this.x, this.y - 25);
            }
        }
        
        class Shot {
            constructor(_speed, _frequency){
                this.x = hero.x + hero.width * .5 ;
                this.y = hero.y;
                this.width = 8; //  832 / 13 
                this.height = 8; //  1344 /21
                this.speed = _speed;
                this.frequency = _frequency;
                this.creationTime = Date.now();
                this.radius = 4;
            }
            show(){
                ctx.beginPath();
                ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI, false); //int x, int y, int width, int height, int startAngle, int arcAngle
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.fill();
        
            }
            move(){
                this.y -= this.speed
            }
        }

        class GameLevel {
            constructor(_levelNumber, _cityHealth, _levelEnemiesTotal, _enemySpeed, _enemyHealth){
                this.levelNumber = _levelNumber;
                this.cityHealth = _cityHealth;
                this.allowedEnemiesOnScreen = 1000;
                this.enemyCount = 0;
                this.levelEnemiesTotal =_levelEnemiesTotal;
                this.enemySpeed = _enemySpeed;
                this.enemyHealth = _enemyHealth;
                this.levelCompleted = false;
            }
        }
            //KeyCode
            window.addEventListener("keydown", function(e){
                keys[e.keyCode] = true;
                hero.moving = true;
                //console.log(keys) //Find keyCode in console.log
            });
            window.addEventListener("keyup", function(e){
                delete keys [e.keyCode];
                hero.moving = false;
            });

        
        
    //Audio
    const auTheLastCity = new Audio("./audio/music/theLastCity.mp3"); 
    const auLose = new Audio("./audio/music/lose.mp3");

    const auHits = [];
    const auHit1 = new Audio("./audio/effects/hit1.mp3");
    const auHit2 = new Audio("./audio/effects/hit2.mp3");
    const auHit3 = new Audio("./audio/effects/hit3.mp3");
    const auHit4 = new Audio("./audio/effects/hit4.mp3");
    const auHit5 = new Audio("./audio/effects/hit5.mp3");
    auHits.push(auHit1, auHit2, auHit3, auHit4, auHit5)
    const auShot = new Audio("./audio/effects/shot.wav");
    const auWon = new Audio("./audio/effects/won.wav");
    const auScreams = [];
    const auScream1 = new Audio("./audio/effects/scream1.ogg");
    const auScream2 = new Audio("./audio/effects/scream2.ogg");
    const auScream3 = new Audio("./audio/effects/scream3.ogg");
    const auScream4 = new Audio("./audio/effects/scream4.ogg");
    auScreams.push(auScream1, auScream2, auScream3, auScream4);
    const auAarghs = [];
    const auAargh1 = new Audio("./audio/effects/aargh1.ogg");
    const auAargh2 = new Audio("./audio/effects/aargh2.ogg");
    const auAargh3 = new Audio("./audio/effects/aargh3.ogg");
    const auAargh4 = new Audio("./audio/effects/aargh4.ogg");
    const auAargh5 = new Audio("./audio/effects/aargh5.ogg");
    const auAargh6 = new Audio("./audio/effects/aargh6.ogg");
    const auAargh7 = new Audio("./audio/effects/aargh7.ogg");
    auAarghs.push(auAargh1, auAargh2, auAargh3, auAargh4, auAargh5, auAargh6, auAargh7);



    //Images
    const bgCity = new Image();
    bgCity.src = "img/backgrounds/city.png";
    const bgCityStreet = new Image();
    bgCityStreet.src = "img/Utility/cityStreet.jpg";
    const bgMetalPlate = new Image();
    bgMetalPlate.src = "img/Utility/metalPlate.png";
    // const bgAudio = new Image();
    // bgAudio.src = "img/Utility/audioOn.png";´
    // const imgHealthPack = new Image();
    // imgHealthPack.src = "img/Utility/healthPack.png"
    const imgArrowKeys = new Image();
    imgArrowKeys.src = "img/Utility/arrowKeys.png"
    const imgSpaceBar = new Image();
    imgSpaceBar.src = "img/Utility/spaceBar.png"

    const playerSprite = new Image();
    playerSprite.src = "img/characters/hero.png";
    
    imgs.push("img/backgrounds/virus3.webp");
    imgs.push("img/backgrounds/virus6.jpg");
    imgs.push("img/backgrounds/virus7.jpg");
    imgs.push("img/backgrounds/virus8.png");
    //imgs.push("img/backgrounds/virus11.jpg");
    imgs.push("img/backgrounds/virus12.jpg");
    imgs.push("img/backgrounds/virus13.jpg");
    imgs.push("img/backgrounds/virus4.jpg");
    imgs.push("img/backgrounds/virus5.webp");
    imgs.push("img/backgrounds/virus9.jpg");
    imgs.push("img/backgrounds/virus1.jpg");
    imgs.push("img/backgrounds/virus2.jpg");
    imgs.push("img/backgrounds/virus10.jpg");
    imgs.push("img/backgrounds/virus14.jpg");

    const characterSprites = []
    const Sprite1 = new Image();
    const Sprite2 = new Image();
    const Sprite3 = new Image();
    const Sprite4 = new Image();
    const Sprite5 = new Image();
    const Sprite6 = new Image();
    const Sprite7 = new Image();
    const Sprite8 = new Image();
    const Sprite9 = new Image();
    const Sprite10 = new Image();
    const Sprite11 = new Image();
    const Sprite12 = new Image();
    const Sprite13 = new Image();
    const Sprite14 = new Image();
    const Sprite15 = new Image();
    const Sprite16 = new Image();
    const Sprite17 = new Image();
    const Sprite18 = new Image();
    
    Sprite1.src = "img/characters/1.png"
    Sprite2.src = "img/characters/2.png"
    Sprite3.src = "img/characters/3.png"
    Sprite4.src = "img/characters/4.png"
    Sprite5.src = "img/characters/5.png"
    Sprite6.src = "img/characters/6.png"
    Sprite7.src = "img/characters/7.png"
    Sprite8.src = "img/characters/8.png"
    Sprite9.src = "img/characters/9.png"
    Sprite10.src = "img/characters/10.png"
    Sprite11.src = "img/characters/11.png"
    Sprite12.src = "img/characters/12.png"
    Sprite13.src = "img/characters/13.png"
    Sprite14.src = "img/characters/14.png"
    Sprite15.src = "img/characters/15.png"
    Sprite16.src = "img/characters/16.png"
    Sprite17.src = "img/characters/17.png"
    Sprite18.src = "img/characters/18.png"
    characterSprites.push(Sprite1, Sprite2, Sprite3, Sprite4, Sprite5, Sprite6, Sprite7, Sprite8, Sprite9, Sprite10, Sprite11, Sprite12, Sprite12, Sprite13, Sprite14, Sprite15, Sprite16, Sprite17, Sprite18)
    
    const scoreBoard = {
        width: canvas.width,
        height: 100
    }

    //Text
    const gameTitle = "The Last Hope";
    let str1 = gameTitle
    let str2 = "The year is 2069 and the Covid19 virus has been" 
    let str3 = "causing havac on the Earth for 5 decades."
    let str4 = "Throughout the years the virus has mutated countless of times and more"
    let str5 = "than 99% of the earth population is currently infected with the virus…"
    let str6 = "Only one city remains uninfected with the virus - The Last Hope."
    let str7 = "You are one of the citizens in The Last Hope and you have been tasked"
    let str8 = "to guard the northern gates."
    let str9 = "Little do you know that a swarm of infected people" 
    let str10 = "are on their way to The Last City."
    let str11 = "If the gates are breached all hope for humanity is lost."
    let str12 = "Be prepared for the longest day of your life"

    function actionHero(){
    if (keys[38] && hero.y > 150 || keys[87] && hero.y > 150){ //UP(38) W(87)
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
}

let keyStatus = "up";
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32){
        //Allow new shot?
        switch (shots.length){
            case 0:
                let shot = new Shot(10, 1);
                shots.push(shot);
                shotsFiredTotal++;
                keyStatus = "down";
                auShot.play();
                break;

            
            default:
                if (Date.now() - shots[shots.length - 1].creationTime > shots[shots.length - 1].frequency && keyStatus === "up"){
                    let shot = new Shot(10, 1)
                    shots.push(shot);
                    shotsFiredTotal++;
                    keyStatus = "down";
                    auShot.play();
                }    
        }
        
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32){
        keyStatus = "up"
    }
});

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




function randomNumber(range, lower){return Math.floor(Math.random() * range + lower)} //return Math.floor(Math.random() * (max - min + 1) + min
//_levelNumber, _cityHealth, _levelEnemiesTotal, _enemySpeed, _enemyHealth

function generateLevels() {
    const level0 = new GameLevel(0,3,3,0.1,1)
    const level1 = new GameLevel(1,3,5,0.2,randomNumber(5,1))
    const level2 = new GameLevel(2,3,12,0.3,randomNumber(3,1))
    const level3 = new GameLevel(3,3,30,0.2,randomNumber(2,1))
    const level4 = new GameLevel(4,3,1,0.1,50)
    gameLevelStats.push(level0, level1, level2, level3, level4);

    for (let i = gameLevelStats.length + 1; i <= 10000; i++){
        let levelNumber = i;
        let cityHealth = 3 //obsolete
        let levelEnemiesTotal = randomNumber(i, i);  
        let enemySpeed = 0.2 + 0.5/20 * randomNumber(1, i); //5% increase per level * random level
        let enemyHealth = randomNumber(1, i/5); //randomNumber(1, gameLevelStats[levelNumber]/5)

        const levelX = new GameLevel(levelNumber,cityHealth,levelEnemiesTotal,enemySpeed,enemyHealth)
        gameLevelStats.push(levelX);
        }
    };

generateLevels();
//console.log(gameLevelStats);


function animate(timeStamp){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    //const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //Background rotation
    const img = document.getElementById("imgVirus")
    img.setAttribute("src", imgs[Math.floor(timeStamp / 8000 % imgs.length)]) //Math.floor(Math.random() * imgs.length)

    //Intro
    switch (gameScreen) {
        case 1:
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.font = "40px Comic Sans MS";
            ctx.textAlign = "center";
            ctx.fillText("CLICK TO ENTER", 300, 150);
            
            //Mouse Click
            canvas.addEventListener("click", () => {
                if (gameScreen === 1 ){
                gameScreen = 2;
                }
            });
            //Any key
            document.addEventListener('keydown', (e) => {
                if (gameScreen === 1 ){
                gameScreen = 2;
                }
            });
            break;
        case 2:
        
        auTheLastCity.play();

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
            if (gameScreen === 2 ){
            gameScreen = 3;
            }
        });
        //Enter Key
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13){
                if (gameScreen === 2 ){
                gameScreen = 3;
                }
            }
            });
        break;
    case 3:    
        
            
    
        //Background and Scoreboard
        //context.drawImage(img,x,y,width,height);
        ctx.fillStyle = 'black';
        //ctx.fillRect(0, canvas.height - 100, scoreBoard.width, scoreBoard.height)
        ctx.drawImage(bgMetalPlate, 0, canvas.height - 102, scoreBoard.width, scoreBoard.height)
        ctx.drawImage(bgCityStreet, 0, 0, canvas.width , 600)
        //ctx.drawImage(bgCity, 0, 400, canvas.width , 200)
        //ctx.drawImage(bgAudio, 550, 10, 40 , 40)
        
        if (gameLevelCurrent === 0){
            //enemies spawn area
            ctx.lineWidth = 4;
            ctx.font = "26px Comic Sans MS strong";
            ctx.textAlign = "left";
            ctx.fillStyle = "white";

            ctx.fillText("Use ", 70, 150)
            ctx.drawImage(imgArrowKeys, 130, 110, 100,60)
            ctx.fillText("to navigate your hero", 250, 150)
            
            // to navigate", 15, 220);
            ctx.fillText("Use ", 70, 230);
            ctx.drawImage(imgSpaceBar, 130, 205, 100, 30)
            ctx.fillText("to shoot", 250, 230)
            
            ctx.textAlign = "center";
            ctx.font = "20px Comic Sans MS strong";
            ctx.fillText("Infected earthlings spawns from top of the screen", 300, 350);
            ctx.fillText("If they reach the bottom of the screen your city loses health", 300, 380);
            ctx.fillText("If your citys health reaches 0 the game is lost", 300, 410);

            ctx.textAlign = "left";
            ctx.fillText("Get the highest score in: ", 170, 460);
            ctx.fillText(" - Maximum Killed Earthlings", 50, 500);
            ctx.fillStyle =  "rgb(255, 255, 0)";
            ctx.fillText("[Christopher Fagg --> Kills: 169.683]", 300, 500);
            
            ctx.fillStyle = "white";
            ctx.fillText(" - Maximum Level Reached", 50, 520);
            ctx.fillStyle = "rgb(255, 255, 0)";
            ctx.fillText("[László Tarnai --> Level: 872]", 300, 520);

            ctx.fillStyle = "white";
            ctx.fillText(" - Maximum Shots Fired", 50, 540);
            ctx.fillStyle = "rgb(255, 255, 0)";
            ctx.fillText("[Tamás Ujj --> Shots: 99.974.121]", 300, 540);
                    }

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
                    auHits[Math.floor(Math.random() * 5)].play();
                    shots.splice(i, 1);
                    enemies[j].health--
                        if(enemies[j].health <= 0){
                            enemies.splice(j, 1);
                            auAarghs[randomNumber(auAarghs.length,0)].play();
                            enemiesKilledTotal++;
                            enemiesRemoved++;
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
              const enemy = new Enemy (Math.random() * (canvas.width - 64) + 32, 0, gameLevelStats[gameLevelCurrent].enemySpeed * (Math.random() * 2 + 0.5), gameLevelStats[gameLevelCurrent].enemyHealth, 50, Math.floor((Math.random() * (characterSprites.length))))
//                const enemy = new Enemy (Math.random() * (canvas.width - 64) + 32, 0, gameLevelStats[gameLevelCurrent].enemySpeed * (Math.random() * 2 + 0.5), randomNumber(1, gameLevelCurrent), 50, Math.floor((Math.random() * (characterSprites.length))))
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
                const enemy = new Enemy(Math.random() * (canvas.width - 64) + 32, 0, gameLevelStats[gameLevelCurrent].enemySpeed * (Math.random() * 2 + 0.5), gameLevelStats[gameLevelCurrent].enemyHealth, 50, Math.floor((Math.random() * (characterSprites.length))))
//                   const enemy = new Enemy(Math.random() * (canvas.width - 64) + 32, 0, gameLevelStats[gameLevelCurrent].enemySpeed * (Math.random() * 2 + 0.5), randomNumber(1, gameLevelCurrent), 50, Math.floor((Math.random() * (characterSprites.length))))
                enemies.push(enemy);
                gameLevelStats[gameLevelCurrent].enemyCount++
            } else {
                enemies[i].enemyTimer++
            }

            if (enemies[i].y > 570){
                enemies.splice(i, 1);
                cityHealthNoReset--;
                enemiesRemoved++
                auScreams[Math.floor(Math.random() * 4)].play();

            }
        }

        //Check Win
        if (gameLevelStats[gameLevelCurrent].enemyCount >= gameLevelStats[gameLevelCurrent].levelEnemiesTotal && //Number of enemies been present
            enemies.length === 0 && //enemies array is empty
            cityHealthNoReset > 0){ //City is still alive
            
            //Level Completed    
            if (gameLevelStats[gameLevelCurrent].levelCompleted === false){
                auWon.play();
            }

            gameLevelStats[gameLevelCurrent].levelCompleted = true;

            
        } else if (cityHealthNoReset <= 0){
            //Lose Game
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.font = "50px Comic Sans MS strong";
            ctx.textAlign = "center";
            //ctx.rotate(20 * Math.PI / 180);
            ctx.fillText("GAME OVER", 300, 300);
            ctx.fillText("The city has been lost", 300, 350);
            ctx.font = "36px Comic Sans MS strong";
            ctx.fillText("Press ENTER to restart the game", 300, 450);
            auTheLastCity.pause();
            auLose.play();

            enemies.splice(0, enemies.length); 
            
            //Check high score 
            if (enemiesKilledTotal > highScoreEnemiesKilledTotal){
                highScoreEnemiesKilledTotal = enemiesKilledTotal
                enemiesKilledTotal = 0;
            };
            if (gameLevelStats[gameLevelCurrent].levelNumber > highScoreGameLevel){
                highScoreGameLevel = gameLevelStats[gameLevelCurrent].levelNumber;   
            };

            if (shotsFiredTotal > highScoreShotsFiredTotal){
                highScoreShotsFiredTotal = shotsFiredTotal;
            };
            
            // const youLose = new Image();
            // youLose.src = "img/Utility/youLose.png";
            //ctx.drawImage(youLose, 0, 100, canvas.width , 400)

            //! Click to restart - issue with starts current level
            //Mouse Click
            
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 13 && gameScreen === 3 && cityHealthNoReset <= 0 ){
                    //Reset variables
                    gameLevelStats.splice(0, gameLevelStats.length);
                    generateLevels()    
                    cityHealthNoReset = cityHealthSet;
                    enemiesRemoved = 0;
                    auLose.pause();
                    auTheLastCity.play();
                    gameLevelCurrent = 1

                }
                });

        }
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font = "35px Comic Sans MS strong";
        ctx.textAlign = "left";
        ctx.fillText("City Health: " + cityHealthNoReset, 15, 630);

        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font = "20px Comic Sans MS strong";
        ctx.textAlign = "left";

        ctx.fillText("Level: " + gameLevelStats[gameLevelCurrent].levelNumber + " / " + gameLevelStats.length, 450, 620);
        ctx.fillText("Wave: " + enemiesRemoved + " / " + gameLevelStats[gameLevelCurrent].levelEnemiesTotal, 450, 640);
        ctx.fillText("Killed: " + enemiesKilledTotal, 450, 660);
        ctx.fillText("Shots: " + shotsFiredTotal, 450, 680);

        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font = "14px Comic Sans MS strong";
        ctx.textAlign = "left";
        ctx.fillText("High Score:   " + "Max Killed: " + highScoreEnemiesKilledTotal + "   Max Level: " + highScoreGameLevel + "   Max Shots: " + highScoreShotsFiredTotal, 20, 690);
 
        if (gameLevelStats[gameLevelCurrent].levelCompleted === true){
            
            if (gameLevelCurrent === 0){
                ctx.drawImage(bgCityStreet, 0, 0, canvas.width , 600)
            }

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
                        enemiesRemoved = 0;
            }
        }
        });
        break;
    };

    handlePlayerFrame();
    handleEnemyFrame();

    requestAnimationFrame(animate);
};
animate(0);


