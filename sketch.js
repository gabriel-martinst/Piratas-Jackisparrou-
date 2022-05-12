// GLOBAIS
const Engine = Matter.Engine;
const World = Matter.World;
// objeto
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world,ground;
var backgroundImg, towerImg, tower;
var cannon, angle, cannonBall;
var boats = [];
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
 
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  // cria��o do objeto
  cannon = new Cannon(180, 110, 130, 100, angle);
  boat = new Boat (width - 79, height - 60, 170, 170, -80)
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);

  Engine.update(engine);

  push();
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();
  
  push(); // captura uma nova configura??o
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop(); // reverte a configura??o anterior
  
  cannon.display();
  showBoats();  
  for (let i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
}

function keyReleased() {
  if(keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot()
  }

}
function keyPressed() 
  {
    if(keyCode === DOWN_ARROW){
      var cannonBall = new CannonBall(cannon.x, cannon.y);
      balls.push(cannonBall)
    }
  }
function showCannonBalls(ball, i) 
  {
    if(ball) {
      ball.display();
    }
  }

function showBoats() 
{
  // se j� tiverem outros navios ir� criar outros
  if (boats.length > 0) {
    
    if(boats[boats.length - 1] === undefined||
      boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [- 40, - 60, -70, -20]
      var position = random(positions)
      var boat = new Boat(width, height - 60, 170, 170, position) 
      boats.push(boat)
    }

    for (let i = 0; i < boats.length; i++) {
      if(boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x: -0.9, y:0})
        boats[i].display()
      }
    }

  } else {
    // se ainda n�o tiverem navios vai criar o primeiro navio
    var boat = new Boat (width, height - 60, 170, 170, -80);
    boats.push(boat);
  }
}


