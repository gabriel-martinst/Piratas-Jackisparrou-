class CannonBall {
    // Metodo = Funcao = function
    constructor(x, y)
    {
        // objeto
        var options = {
            isStatic: true
        }

        this.radius = 30;
        this.speed = 0.05;
        this.body = Bodies.circle(x, y, this.radius, options);
        this.image = loadImage("./assets/cannonball.png");
        World.add(world, this.body);
        this.animation = [this.image];
        this.isSink = false;
    }
    
    shoot()
    {
        var newAngle = cannon.angle - 28;
        newAngle = newAngle *(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
          x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
    }


    display() 
    {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.speed % this.animation.length);

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, 0, this.radius, this.radius);
      pop();
    }

    remove(i)
    {
      this.isSink = true;
      Body.setVelocity(this.body, {x: 0, y: 0});
      this.animation = waterSplashAnimation;
      this.radius = 150;
      
      setTimeout(() => { 
        Matter.World.remove(world, this.body)
        delete balls[i]
    }, 300)
    }
}