var tower,climber,door,ghoost,block;
var towerImage,climberImage,doorImage,ghoostImage;
var climberGroup,doorGroup,blockGroup;

var PLAY=1;
var END=0;

var gameState=PLAY;

function preload(){
  
  towerImage = loadImage("tower.png")
  climberImage = loadImage("climber.png")
  doorImage = loadImage("door.png")
  ghoostImage = loadImage("ghost-standing.png")
  
  
}



function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=+2;
  
  ghoost = createSprite(300,300)
  ghoost.addImage(ghoostImage)
  ghoost.scale=0.4
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
  
}

function draw(){
  background("black")
  
  if (gameState===PLAY){
    drawSprites();
     spawnDoor();
    
     if(tower.y>600){
    tower.y=0
  }
  
  if (keyDown("space")){
    ghoost.velocityY=-10;
  }
  
  if (keyDown("left")){
    ghoost.x=ghoost.x-1;
  }
  
   if (keyDown("right")){
    ghoost.x=ghoost.x+1;
  }
  
  if (climberGroup.isTouching(ghoost)){
    ghoost.velocityY=0;
  }
  
  ghoost.velocityY=ghoost.velocityY+0.8;
  
  
  if (ghoost.y>600 || ghoost.y<0 || ghoost.isTouching(blockGroup)) {
    gameState = END;
  }
  
  
 
  }else if(gameState===END){
           
    tower.velocityY=0;
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    
    background("black")
    fill("white")
    textSize(30)
    text("Gameover",250,300)
    
 
    
    }
  
 
  
  
  
}


function spawnDoor(){
  
  if (frameCount%200===0){
  door = createSprite(200,0)
  door.velocityY=3
  door.addImage(doorImage)
  door.lifeTime=200;
  ghoost.depth=door.depth;
  ghoost.depth=ghoost.depth+1;
  doorGroup.add(door);
  door.x = Math.round(random(100,350))
    
    
  climber = createSprite(200,55)
  climber.velocityY=3;
  climber.addImage(climberImage)
  climber.x = door.x;
  climber.lifeTime=200;
  climberGroup.add(climber);
    
    block  = createSprite(200,60);
    block.velocityY=3;
    block.x=climber.x;
    block.lifeTime=200;
    block.visible=false;
    blockGroup.add(block)
    
    
}
  

  
}