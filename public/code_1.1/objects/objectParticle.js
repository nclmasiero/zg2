class objectParticle {
    constructor(x, y, size, xSpeed, ySpeed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.color = color;
        this.toDestroy = false;
    }

    update() {
        // applying gravity
        this.ySpeed += gravity;

        // applying speeds
        this.y += this.ySpeed;
        this.x += this.xSpeed;

        // checking toDestroy
        if (this.y > height || this.x > width || this.x < 0) {
            this.toDestroy = true;
        }
    }

    render() {
        fill(this.color);
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);
    }

    static createEffect(x, y, spread, quantity, color, size) {
        for (var i = quantity; i >= 0; i--) {
            var particle = new objectParticle(x, y, size, random(-spread, spread), random(-spread, spread), color);
            formPlay.particles.push(particle);
        }
    }
}