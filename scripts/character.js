export default class Character {
    constructor(_x, _y, _speed){
    this.width = 64; //  832 / 13 = 
    this.height = 64; //  1344 /21
    this.x = (600 - this.width) * 0.5;// (canvas.width - this.width) * 0.5;
    this.y = 700 - this.height - 100;//canvas.height - this.height - 100;
    this.frameX = 0; //Frame of spriteSheet
    this.frameY = 3;
    this.speed = _speed;
    this.moving = false;
    //this.direction = Math.random - 0,5 // between 0,5 and -0,5
    }
}
