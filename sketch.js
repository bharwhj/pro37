var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1
var END=0
var gamestate = PLAY
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameover
var reset

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  resetbutton =loadImage("restart.png")
  gameover1   =loadImage("gameOver.png")
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

     gameover =createSprite(200,20);
     reset=createSprite(250,80);
    reset.addImage("reset",resetbutton)
    gameover.addImage("go",gameover1)
  gameover.scale=0.6
  reset.scale=0.4
  gameover.visible=false;
  reset.visible=false;
  
  
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  if (gamestate===PLAY)
  {
      
  if(keyDown("space")&& trex.y>150) 
  {
    trex.velocityY = -10;
    trex.velocityY = trex.velocityY + 0.8
  }
  trex.velocityY = trex.velocityY + 0.8
    
      if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
    
      score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
    
    spawnClouds();
  spawnObstacles();
   ground.velocityX = -4;
    
    
    if (obstaclesGroup.isTouching(trex)) 
        {
        gamestate=END
    
        }

        camera.position.x = displayWidth/2
        camera.position.y = displayHeight/2
      
  }
  else if (gamestate===END)
  {
    ground.velocityX=0 
    text("Score: "+ score, 500,50);
  
    
   cloudsGroup.destroyEach()
   obstaclesGroup.destroyEach()
    
    
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
      trex.changeAnimation("collided",trex_collided)
      trex.velocityY=0
gameover.visible=true;
reset.visible=true;  
  }
  
  trex.collide(invisibleGround);
  
 if(mousePressedOver(reset)){
   
  reset1(); 
 }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset1() 
{
 gamestate=PLAY
 
  gameover.visible=false;
  reset.visible=false;
      trex.changeAnimation("running",trex_running)
  score=0
  
  
  
  
  
  
  
}





