class Cannon {
    constructor(x, y, width, height, angle)    
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.cannonBaseImg = loadImage("./assets/cannonBase.png");
        this.cannonTopImg = loadImage("./assets/canon.png"); 
    }

    display()
    {
        if (keyIsDown(DOWN_ARROW) && this.angle < 70) {
            this.angle += 1;
        }

        if (keyIsDown(UP_ARROW) && this.angle > -30) {
            this.angle -= 1;
        }

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.cannonTopImg, 0, 0, this.width, this.height);
        pop();
        image(this.cannonBaseImg, 70, 20, 200, 200);
        // noFill();
    }
    
}
