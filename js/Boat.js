class Boat {
   constructor(x, y, width, height, boatPos, boatAnimation){
    var options = {
        // isStatic: false,
        restitution: 0.8, // elasticidade
        friction: 1.0, // atrito do ar
        density: 1.0, // densidade
        label: "boat"
    }
    this.animation = boatAnimation;
    this.speed = 0.05;
    this.width = width;
    this.height = height;
    this.boatPos = boatPos;
    this.image = loadImage("./assets/boat.png");
    this.body = Bodies.rectangle(x, y, width, height, options);
    World.add(world, this.body);
   } 

   display(){
    var pos = this.body.position;
    var angle = this.body.angle;
    var index = floor(this.speed % this.animation.length);

    console.log(index);
    
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatPos, this.width, this.height);
    pop();
   }

   animate()
   {
       this.speed = this.speed + 0.05;
   }
}