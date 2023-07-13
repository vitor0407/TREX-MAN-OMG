var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage;
var gameState='play';
var  cactusGroup;
var cactus,cactusImage1,cactusImage2,cactusImage3,cactusImage4;
var cactusImage5,cactusImage6;
var cloudsGroup;
var score = 0;
var gameOver, gameOverImage;
var restart, restartImage;
var checkpointSound, dieSound, jumpSound;
var HI = 0
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
cloudImage=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  cactusImage1=loadImage("obstacle1.png");
  cactusImage2=loadImage("obstacle2.png");
  cactusImage3=loadImage("obstacle3.png");
  cactusImage4=loadImage("obstacle4.png");
  cactusImage5=loadImage("obstacle5.png");
  cactusImage6=loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  checkpointSound=loadSound("sound/checkPoint.mp3"); 
  dieSound=loadSound("sound/die.mp3");
 jumpSound=loadSound("sound/jump.mp3");
}

function setup() {
createCanvas(windowWidth,windowHeight);





//criar um sprite de trex
trex = createSprite(50,height-40,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("vasco",trex_collided);
trex.scale = 0.5;
trex.setCollider("circle",0,0,45);

//criar um sprite ground (solo)
ground = createSprite(200,height-20,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -6;
  //exemplo de concatenação
   console.log("O trex fica na posição " + trex.x + "x da tela");
   cactusGroup= new Group();
   
   cloudsGroup=new Group();
   trex.debug=false;

   //criar solo invisível
    invisibleGround = createSprite(200,height-10,400,10); 

    invisibleGround.visible = false;
    gameOver=createSprite(width/2,height/2-40);
    gameOver.addImage(gameOverImage);
    gameOver.scale=0.8

    restart=createSprite(width/2,height/2);
    restart.addImage(restartImage);
    restart.scale=0.5

}

function draw() {
background(250);
text("P:" + score,width-40,35);
text("HI:" + HI,width-80,35);
trex.collide(invisibleGround);
drawSprites();


if(gameState === 'play'){
score =score + Math.round(getFrameRate()/30);

ground.velocityX = -(4 + 2*score/100);
cactusGroup.setVelocityXEach(-(4 + 2*score/100));
if(score>0 && score% 300===0){
  checkpointSound.play();
}
  if (touches.length  > 0 || keyDown("space") && trex.y>height-70 ) {
touches = []
    trex.velocityY = -10;
jumpSound.play();
  
  }
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  
  spwanCloud();
  spwanCactus();
if(trex.isTouching(cactusGroup)){
  dieSound.play();
gameState='end';  
}
gameOver.visible=false;

restart.visible=false;

}
else if(gameState === 'end'){
ground.velocityX=0 
cactusGroup.setVelocityXEach(0);

cloudsGroup.setVelocityXEach(0);

gameOver.visible=true;

restart.visible=true;

cloudsGroup.setLifetimeEach(-1);

cactusGroup.setLifetimeEach(-1);

trex.changeAnimation("vasco");

if(touches.length > 0 || mousePressedOver(restart)){
reset();
touches = [];
}

}


trex.velocityY = trex.velocityY + 0.8



}
function reset(){
  if(score > HI ){
    HI = score;
    
    }
    
  gameState ='play';

score = 0;

cactusGroup.destroyEach();
cloudsGroup.destroyEach();

trex.changeAnimation("running");


}

function spwanCloud(){
if(frameCount % 60 === 0){ 
 cloud=createSprite(width,50,50,20);

  cloud.addImage(cloudImage);

  cloud.velocityX=-3;

  cloud.scale=0.2;

cloud.y= Math.round(random(height-190,height-450));

trex.depth = cloud.depth;

trex.depth = trex.depth +1 ;

restart.depth = cloud.depth;

cloud.lifetime = 450;


cloudsGroup.add(cloud);
}
}
function spwanCactus(){
if(frameCount % 60 === 0){
cactus=createSprite(width,height-35,20,50);

cactus.velocityX=-6;

var aleatorio = Math.round(random(1,4));
switch(aleatorio){
case 1: cactus.addImage(cactusImage1);
break;
case 2: cactus.addImage(cactusImage2);
break;
case 3: cactus.addImage(cactusImage3);
break;
case 4: cactus.addImage(cactusImage4);
break;
case 5: cactus.addImage(cactusImage5);
break;
case 6: cactus.addImage(cactusImage6);
break;
}
cactus.scale = 0.5

cactus.lifetime=220;

console.log(aleatorio);
cactusGroup.add(cactus);



}

}