const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let cvwd, cvht = null;
let player = null;
const missiles = [];

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

class Missile{
    constructor(x,y,r,color,v){ // v=velocity
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.v = v;
        this.draw();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false)
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.x = this.x + this.v.x*5;
        this.y = this.y + this.v.y*5;
        this.draw();
    }
}

class CheckPoint{
    constructor(x,y,r,color){ // v=velocity
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

function animate(){
    // 재귀 애니메이션
    requestAnimationFrame(animate);    
    // 화면 지우고 player 동그라미 나오기
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw();    
    // 미사일 쏘기, 화면 밖 미사일 리스트에서 제거
    let removeMissilesNum = [];
    missiles.forEach((m,index,array) => {
        m.update();        
        if(m.x+m.r<0 || m.x+m.r>canvas.width || m.y+m.r<0 || m.y+m.r>canvas.height){
            removeMissilesNum.push(index);
        }
    });
    while(removeMissilesNum[0]!=null){
        missiles.splice(removeMissilesNum.pop(),1);
    }    
}

function init(){
    setCanvas();
    setPlayer();
    animate();
}

// event

canvas.addEventListener("click",(e)=>{    
    const checkpoint = new CheckPoint(e.offsetX,e.offsetY,1,'blue')    
    const rad = Math.atan2(e.offsetY-cvht,e.offsetX-cvwd);
    //const rad = angle*Math.PI/180;
    const vx = Math.cos(rad);
    const vy = Math.sin(rad);
    //const vx = Math.cos(angle);
    //const vy = Math.sin(angle);
    //console.log(angle, vx, vy);
    missiles.push(new Missile(cvwd,cvht,5,'red',{x:vx,y:vy}));
});





// init()
init();
