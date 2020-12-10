var tower,towerImage
var door,doorImage
var ghost,ghostImage
var doorsGroup
var gameState = "PLAY"
var jumpSound


function preload(){
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  ghostImage = loadImage("ghost-standing.png")
  jumpSound = loadSound("spooky.wav")
}


function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300,0,0)
  tower.addImage(towerImage)
  tower.velocityY = 2
  ghost = createSprite(300,300,0,0)
  ghost.addImage(ghostImage)
  ghost.scale = 0.5
  doorsGroup=new Group()
  ghost.debug = true
}



function draw(){
  if(gameState === "PLAY"){
    
  if (tower.y > 600){
    tower.y = 100;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -4  
  }
  
  ghost.velocityY += 0.2
    
    //jumpSound.play()
  
  if(keyDown("left_arrow")){
    ghost.x -= 4
  }
  
  if(keyDown("right_arrow")){
    ghost.x += 4
  }
  
    if(doorsGroup.isTouching(ghost)||ghost.y>600){
      gameState = "END"
    }
    
    
  spawnDoors()
  
  drawSprites()
    
  }
  if(gameState === "END"){
    background(0);
    fill("yellow")
    textSize(20);
    text("Game Over",250,300)
  }
}

function spawnDoors(){
  if(frameCount%150 === 0){
    var door = createSprite(300,-50,20,20)
    door.addImage(doorImage)
    door.velocityY = 2
    door.x = Math.round(random(100,500))
    
    door.depth = ghost.depth
  ghost.depth += 1
    doorsGroup.add(door)
    doorsGroup.lifetime = 300
  }
  
}
