var player;
var playerAnimation;
var ground;
var groundimg;
var gameStates='play';
var obstaclesGroup;
var obstacleimg;
var score = 0;
var playercollided;

function preload(){
playerAnimation = loadAnimation ('player/frame_0','player/frame_1', 'player/frame_2','player/frame_3','player/frame_4','player/frame_5','player/frame_6','player/frame_7')

groundimg = loadImage ('player/ground-clipart.png')

obstacleimg = loadImage('player/stone');

playercollided = loadImage('player/frame_0');
}

function setup() {
  createCanvas(800,400);
 
  player = new Player()
 player.body.addAnimation('playerRunning', playerAnimation)
 player.body.scale=0.1;

 player.body.addAnimation('playerCollided', playercollided)

 ground = createSprite (600,380,800,20);
 ground.addImage("ground", groundimg)
 ground.scale = 0.15
 ground.setCollider("rectangle",0,0,ground.width,500)
 ground.debug = true
 //ground.x=ground.width/2

 ground.velocityX= -2
 
 obstaclesGroup = new Group();
}

function draw() {
  background("lightblue");  
  console.log (ground.width)
  
  textSize(30)
  text ('score'+ score,100,100)
  if(gameStates==='play'){
    score = Math.round(score + frameRate()/30);

if(ground.x<150){
  ground.x=600

}

if(keyDown(UP_ARROW)){
  player.body.velocityY = -10
}

player.body.velocityY = player.body.velocityY + 0.5
player.body.collide(ground)
  spawnObstacle();
  if(player.body.isTouching(obstaclesGroup)){
    gameStates= 'end'
  }
}else if(gameStates==='end'){
  ground.velocityX= 0;
  player.body.changeAnimation('playerCollided', playercollided)
  obstaclesGroup.setVelocityXEach(0);
}
  
  drawSprites();


}

function spawnObstacle(){
if (World.frameCount%120===0){
var obstacle = new Obstacle()
obstacle.body.addImage('obstacles', obstacleimg)
obstacle.body.scale = 0.05
obstaclesGroup.add(obstacle.body)
}

}