class Boat {
   constructor(x, y, width, height,boatPos){
    var options = {
        isStatic: false
    } 
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
    
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.boatPos, this.width, this.height);
    pop();
   }

   remove(index){
    Body.setVelocity(this.body, {x: 0, y: 0});
    setTimeout()

   }
}
