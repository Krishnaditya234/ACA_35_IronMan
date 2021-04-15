var ironMan, iron_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;


function preload(){
  ironImage =  loadImage("images/iron.png");
  bgImage = loadImage("images/bg.jpg");
  brickImage = loadImage("images/stone.png");
  coinImage = loadImage("images/diamond.png");
  obstacleImage = loadImage("images/spikes.png")
}

function setup() {
  createCanvas(1360, 650);
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =2;
  bg.velocityY=8;

  ironMan = createSprite(200, 505, 1, 50);
  ironMan.addImage( ironImage);
  ironMan.scale = 0.2;
  ironMan.debug=false; 


  ground = createSprite(100,585,2500,10);
  ground.visible=false;

  bricksGroup = new Group();
  coinsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {


  if (bg.y > 600){
    bg.y=bg.width/4;
  }
  if(keyDown("up")){
    ironMan.velocityY= -12;
  }
  if(keyDown("left")){
    ironMan.x-=10;
  }
  if(keyDown("right")){
    ironMan.x+=10
    ;
  }
   ironMan.velocityY += 1;
ironMan.collide(ground);
generateObstacles();
generateBricks();
for(var i = 0 ; i< (bricksGroup).length ;i++){
  var temp = (bricksGroup).get(i) ;
  
  if (temp.isTouching(ironMan)) {
     ironMan.collide(temp);
 
    }
      
  }
  generateCoins();
  for(var i = 0 ; i< (coinsGroup).length ;i++){
    var temp = (coinsGroup).get(i) ;
    
    if (temp.isTouching(ironMan)) {
      coinScore++;
      temp.destroy();
      temp=null;
      }
        
    }
    drawSprites();
  textSize(20);
  fill("brown")
  text("Diamonds Collected: "+ coinScore, 500,50);
  
}



function generateBricks() {
  var v = Math.round(random(100,200))
  if (frameCount % v === 0) {
    var brick = createSprite(random(800,40),40,10);
    brick.y = 1;
    brick.addImage("brick",brickImage);
    brick.x = Math.round(random(0,1260));
    brick.scale = 0.6;
    brick.velocityY = 1;
    
    brick.lifetime =1200;
    bricksGroup.add(brick);
  }
}
function generateCoins() {
  var v = Math.round(random(100,200))
  if (frameCount % v === 0) {
    var coin = createSprite(1200,120,40,10);
    coin.addImage("coin", coinImage);
    coin.x = Math.round(random(0,1260));
    brick.y = 1;
    coin.scale = 0.5;
    coin.velocityY = 1;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

function generateObstacles() {
  var a = Math.round(random(200,500));
  if(frameCount % a === 0) {
    var obstacle = createSprite(1200,545,10,40);
    obstacle.velocityY = -4;
    obstacle.scale=1;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.x = Math.round(random(0,1260));
    brick.y = 1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}