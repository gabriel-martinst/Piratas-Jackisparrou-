// GLOBAIS
const Engine = Matter.Engine;
const World = Matter.World;
// objeto


const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var isGamerOver = false
var engine, world,ground;
var backgroundImg, towerImg, tower;
var cannon, angle, cannonBall;
var boats = [];
var balls = [];
var boatAnimation = [];
var boatSpritedata, boatSpritesheet;
var brokenBoatAnimation = [], brokenBoatSpriteData, brokenBoatSpriteSheet;
var backgroundMusic, waterSound, pirateLaughSound, cannonExplosionSound;
var waterSpritedata, waterSpritesheet, waterSplashAnimation = [];

function preload() {
  // imagens
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");

  // json
  boatSpritedata = loadJSON("./assets/boat/boat.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png");
  brokenBoatSpriteData = loadJSON("./assets/boat/brokenBoat.json");
  brokenBoatSpriteSheet = loadImage("./assets/boat/brokenBoat.png");
  waterSpritedata = loadJSON("./assets/waterSplash/waterSplash.json");
  waterSpritesheet = loadImage("./assets/waterSplash/waterSplash.png");

  // som
  backgroundMusic = loadSound("./assets/background_music.mp3");
  waterSound = loadSound("./assets/cannon_water.mp3");
  pirateLaughSound = loadSound("./assets/pirate_laugh.mp3");
  cannonExplosionSound = loadSound("./assets/cannon_explosion.mp3");
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
  
  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  boat = new Boat(width - 79, height - 60, 170, 170, -80, boatAnimation);

  var brokenBoatFrames = brokenBoatSpriteData.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSpritedata.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();
  
  push(); // captura uma nova configuracao
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImg, 0, 0, 160, 310);
  pop(); // reverte a configuracao anterior
  
  showBoats();

  for (let i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();
}

function keyReleased() {
  if(keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
    cannonExplosionSound.play();
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
    if (ball.body.position.x >= width || ball.body.position.y >= height -50){
      waterSound.play();
      ball.remove(i);
    }
  }
}

function collisionWithBoat(i)
{
  for (var j = 0; j < boats.length; j++){
    if (balls[i] !== undefined && boats[j] !== undefined){
      var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
      
      if(collision.collided){
        boats[j].remove(j);
        World.remove(world, balls[i].body);
        delete balls[i];
      }
    }
  } 
}

function showBoats() 
{
  // se já tiverem outros navios irá criar outros
  if (boats.length > 0) {
    
    if(boats[boats.length - 1] === undefined || 
      boats[boats.length - 1].body.position.x < width - 300) {
      
      var positions = [- 40, - 60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width, 
        height - 100, 
        170, 
        170, 
        position, 
        boatAnimation
      ) ;

      boats.push(boat);
    }

    for (let i = 0; i < boats.length; i++) {
      if(boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x: -0.9, y:0});
        boats[i].display();
        boats[i].animate();

        var collision = Matter.SAT.collides(this.tower, boats[i].body);

        if (collision.collided){
          isGamerOver = true;
          gameOver();
        }
      }
    }

  } else {
    // se ainda nao tiver navio vai criar o primeiro navio
    var boat = new Boat (width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}

function gameOver()
{  
  swal(
  {
    title: `Fim de Jogo!!!`,
    text: "Obrigada por jogar!!",
    imageUrl:
      "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Jogar Novamente"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  });
  
}