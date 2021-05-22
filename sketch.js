var grid = 50;
var width = 1366;
var height = 700;
var carGroup1,logGroup1;

var grassHeight = 100;
var gameState = "play";
var carAnimation, logAnimation, playerAnimation;
function preload()
{
  carAnimation1=loadAnimation("images/car1.png")
  carAnimation3=loadAnimation("images/car2.png")
  playerAnimation=loadAnimation("images/player-03.png")
  logAnimation=loadAnimation("images/log2.png")
  cityAnimation=loadAnimation("images/city1.png")
}

function setup() {
  createCanvas(1366,2700);
  carGroup1 = new Group();
  logGroup1 = new Group();

  for(var i = 0;i<6;i++){
    var bottomGrass1 = createSprite(width/2,height-50-(i*400),width,grassHeight)
    if(i%2===0)
    {
      var road= createSprite(width/2,height-150-(i*400)-grassHeight,width,300)
      road.shapeColor="black"
    }
    bottomGrass1.shapeColor="green"
  }

  for(i = 0;i < 40; i++){
    cars=new Car(2);
    carGroup1.add(cars.spt)
  }
  for(i = 0;i < 40; i++){
    logs=new Log(2);
    logGroup1.add(logs.spt)
  }

  player1 = new Player(width/2,height/2-25,grid)

  city=createSprite(width/2,500)
  city.addAnimation("city",cityAnimation)
 }

function draw() {
  background("skyblue");
  console.log(player1.spt.y)

  for(i = 1;i<carGroup1.length;i++){
    if(carGroup1[i].x>width)
    {
      carGroup1[i].x=0;
    }
    if(carGroup1[i].x<0){
      carGroup1[i].x=width;
    }
  }
  
  for(i = 1;i<logGroup1.length;i++){
    if(logGroup1[i].x>width)
    {
      logGroup1[i].x=0;
    }
    if(logGroup1[i].x<0){
      logGroup1[i].x=width;
    }
  }
  if(carGroup1.isTouching(player1.spt)){
    player1.spt.x= width/2
    player1.spt.y= height-75
  }
  if(logGroup1.isTouching(player1.spt)){
    player1.spt.x= player1.spt.x-3
  }
  else if((player1.spt.y > height-1550 && player1.spt.y < height-1300) ||
         (player1.spt.y < height-550 && player1.spt.y > height-850) ||
         (player1.spt.y>height) ||
         (player1.spt.x<0)||
         (player1.spt.x>width)){
           player1.spt.x = width/2
           player1.spt.y = height-75
         }
  if(city.isTouching(player1.spt)){
    gameState= "Win";
    console.log("inside isTouching");
  }
  if(gameState==="Win")
  {
    //console.log("inside Win"+ gameState);
    //console.log("inside Win"+ city.x,+ " " +city.y);
    stroke("Green")
    fill("Green")
    textSize(60)
    text("Congratulations! You made it.",width/3,2100)
   // text("Congratulations! You made it.",width/2-250,-1700)
    carGroup1.destroyEach()
    logGroup1.destroyEach()
  }

  translate(0,-player1.spt.y+height-150)


  drawSprites();
  
}



function keyPressed(){
  if(keyCode == UP_ARROW){
    player1.move(0,-2)
     
  } else if (keyCode == DOWN_ARROW){
    player1.move(0,2)
    
  } else if(keyCode == LEFT_ARROW){
    player1.move(-2,0)
  } else if(keyCode == RIGHT_ARROW){
    player1.move(2,0)
  }
}