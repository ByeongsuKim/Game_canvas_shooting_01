const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let cvwd, cvht = null;
let player = null;


// class

class Player{
    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.draw();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false)
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


// function

function setCanvas(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    cvwd = canvas.width/2;
    cvht = canvas.height/2;
}

function setPlayer(){
    player = new Player(cvwd,cvht,10,'black');
}

function init(){
    setCanvas();
    setPlayer();
}

// init()
init();
