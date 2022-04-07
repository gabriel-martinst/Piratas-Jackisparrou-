class Cannon {
    constructor(x, y, width, height, angle)    
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;    
    }
    display()
    {
        rect(this.x, this.y, this.width, this.height, this.angle);
        push();
        imageMode(CENTER);
        pop();
    }
    
}
