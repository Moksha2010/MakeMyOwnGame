//var runner, runnerImg;
var bgImg, bg;
var stoneGroup
var lives = 3
var score = 0
gameState="play"

const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

function preload() {
  runnerImg = loadAnimation("Runner-1.png", "Runner-2.png");
  bgImg = loadImage("straightroad.png");
  stoneImg = loadImage("stone.png");
  gamebg=loadImage("bg.jpg")
  overimg=loadImage("gameover.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define colors
  b1 = color(255);
  b2 = color(0);
  c1 = color(204, 102, 0);
  c2 = color(0, 102, 153);



  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg);
  bg.velocityY = 2;
  bg.scale = 3;



  runner = createSprite(width / 2, height - 100, 30, 30);
  runner.addAnimation("player", runnerImg);
  runner.scale = 0.07;


  wall1 = createSprite(width / 2 - 110, height / 2, 10, height)
  wall1.visible = false



  wall2 = createSprite(width / 2 + 110, height / 2, 10, height)
  wall2.visible = false


  stoneGroup = new Group()

  // runner.debug=true
runner.setCollider("circle",0,0,40)

gameoversprite=createSprite(width/2,height/2)
gameoversprite.addImage(overimg)
gameoversprite.visible=false

}

function draw() {

background("lightblue")
setGradient(0, 0,width+width, height, c2, c1, Y_AXIS);
if(gameState==="play"){
 // Background
//  setGradient(0, 0, width , height, b1, b2, X_AXIS);
//  setGradient(width / 2, 0, width , height, b2, b1, X_AXIS);
 // Foreground
 
 //setGradient(0, 0, 540, 80, c2, c1, X_AXIS);
 
score=Math.round(frameCount/60)

  if (keyDown(LEFT_ARROW)) {
    runner.x -= 5
  }

  if (keyDown(RIGHT_ARROW)) {
    runner.x += 5
  }

  showRocks()

  for (i = 0; i < stoneGroup.length; i++) {
    if (stoneGroup.get(i).isTouching(runner)) {
      stoneGroup.get(i).remove()
      lives -= 1

    }
  }
if(lives<=0){
  gameState="Over"
}


  if (bg.y > 390) {
    bg.y = 300
  }


  if (runner.isTouching(wall1) || runner.isTouching(wall2)){
    if(runner.isTouching(wall1)){
      runner.x= runner.x+25
    }
    else if(runner.isTouching(wall2)){
      runner.x= runner.x-25
    }
  }
}


if(gameState==="Over"){
  background(0)
  gameoversprite.visible=true
  runner.velocity=0
  bg.velocity=0
  stoneGroup.destroyEach()
}
  drawSprites();

  fill(255)
  text("LIVES : "+lives,50,50)
  text("SCORE : "+score,width-100,50)
}


function showRocks() {
  if (frameCount % 100 == 0) {
    stone = createSprite(width / 2, height / 2, width, height);

    var randX = Math.round(random((width / 2) - 50, (width / 2) + 50))
    stone.x = randX

    var randY = Math.round(random((height / 4) - 50, (height / 2)))
    stone.y = randY

    stone.velocityY = 2


    stone.addImage(stoneImg);
    stone.scale = 0.3;
    stoneGroup.add(stone)
    // stone.debug=true
  }



}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
   }
   
   
   // else if (axis === X_AXIS) {
  //   // Left to right gradient
  //   for (let i = x; i <= x + w; i++) {
  //     let inter = map(i, x, x + w, 0, 1);
  //     let c = lerpColor(c1, c2, inter);
  //     stroke(c);
  //     line(i, y, i, y + h);
  //   }
  // }
}

