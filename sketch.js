// GLOBAIS
const Engine = Matter.Engine;
const World = Matter.World;
// objeto
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world,ground;
var backgroundImg, towerImg, tower;
var cannon, angle, cannonBall;

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
  // criação do objeto
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);

  Engine.update(engine);

  push();
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();
  
  push(); // captura uma nova configura��o
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop(); // reverte a configura��o anterior
  
  cannon.display();
  cannonBall.display();
}

function keyReleased() {

}
