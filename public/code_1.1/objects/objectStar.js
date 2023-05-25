class objectStar {
    constructor(x, y, w, h, damage, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.damage = damage;
        this.speed = speed;

        this.image = textureStar;
        this.toDestroy = false;
    }

    update() {
        // moving
        this.y += this.speed;

        // checking to destroy
        if (this.y >= formPlay.floorLevel - this.h / 2) this.toDestroy = true;
    }

    render() {
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
    }
}