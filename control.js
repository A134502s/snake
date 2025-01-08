function gamestart(){
    snakePostion()
    let lose = isOver()
    if (lose){
        document.body.addEventListener('keydown',playagain)
        //ctx.fillStyle = "white"
        //ctx.font = "10px Poppins"
       //ctx.fillText("point:"+headX+","+headY,canvas.width-50,20)
        return
    }
    clearScreen()
    drawapple()
    drawsnake()
    drawscore()
    checkcoil()
    let win =  isWIn()
    if (win){
        return
    }
    setspeed()
    setTimeout(gamestart,1000/speed)
}
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
class SnakeMove{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
let speed = 8;
let tilecount = 20;
let tileSize = canvas.width/tilecount-2;
let headX = 10;
let headY = 10;
const snakemove = [];
let tailen = 0;
let appleX = 5;
let appleY = 5;
let xV = 0;
let yV = 0;
let score = 0;

function snakePostion(){
    headX = headX+xV;
    headY = headY+yV;
    ctx.fillStyle = "white"
    ctx.font = "10px Poppins"
    ctx.fillText("point:"+headX+","+headY,canvas.width-50,30)
    
}
function isOver(){
    let over = false
    if (headX<0 || headX==20 ||headY<0||headY==20){
        over =true
    }
    for (let i = 0;i<snakemove.length;i++){
        if (headX == snakemove[i].x&&headY == snakemove[i].y){
            over = true
        }
    
    }
    if (over){
        ctx.fillStyle ="white"
        ctx.font = "50px Poppins"
        ctx.fillText("game over",canvas.width/6.5,canvas.height/2)
        ctx.font = "40px Poppins"
        ctx.fillText("在玩一次?",canvas.width/3.5,canvas.height/2+50)
        ctx.font = "25px Poppins"
        ctx.fillText("按空白鍵",canvas.width/2.7,canvas.height/2+100)

    }
    return over
}

function clearScreen(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,400,400)
}
function checkcoil(){
    if (appleX == headX&&appleY==headY){
        appleX = Math.floor(Math.random()*tilecount)
        appleY = Math.floor(Math.random()*tilecount)
        tailen++
        score ++
        
    }
}
function isWIn(){
    let win = false
    if (score == 25){
        win = true

    }
    if (win){
        ctx.fillStyle='white'
        ctx.font ="50px Poppins"
        ctx.fillText("you win",canvas.width/3.3,canvas.height/2)
    }
    return win
}
function drawapple(){
    ctx.fillStyle = "red"
    ctx.fillRect(appleX*tilecount,appleY*tilecount,tileSize,tileSize)
}
function drawsnake(){
    ctx.fillStyle = "green"
    for (let i =0;i<snakemove.length;i++){
        let part = snakemove[i]
        ctx.fillRect(part.x*tilecount,part.y*tilecount,tileSize,tileSize)
    }
    snakemove.push(new SnakeMove(headX,headY))
    if (snakemove.length>tailen){
        snakemove.shift()
    }

    ctx.fillStyle ='Orange'
    ctx.fillRect(headX*tilecount,headY*tilecount,tileSize,tileSize)


}
function drawscore(){
    ctx.fillStyle = 'white'
    ctx.font = "10px Poppins"
    ctx.fillText("Score: "+score,canvas.width-50,10)
    ctx.fillStyle = "white"
    ctx.font = "10px Poppins"
    ctx.fillText("point:"+headX+","+headY,canvas.width-50,20)
}
function setspeed(){
    if (score == 5){
        speed = 10
    }
}
document.body.addEventListener('keydown',keyDown)

function keyDown(event){
    if (event.keyCode == 38){
        if (yV == 1)
            return;
        yV =-1
        xV = 0
    }
    if (event.keyCode == 40){
        if (yV == -1)
            return
        yV = 1
        xV = 0
    }
    if  (event.keyCode == 37){
        if (xV == 1)
            return
        xV =-1
        yV = 0
    }
    if (event.keyCode == 39){
        if (xV==-1)
            return
        xV = 1
        yV = 0
    }
}
function playagain(event){
    if (event.keyCode == 32){
        location.reload()
    }
}

gamestart()