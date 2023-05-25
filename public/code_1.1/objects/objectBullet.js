class objectBullet {
    constructor(x, y, direction, damage = 10, size = 5, stepForce = 15, maxHp = 1) {
        this.x = x;
        this.y = y;
        this.stepForce = stepForce;
        this.maxHp = maxHp;
        this.size = size;
        this.damage = damage;
        this.direction = direction;
        this.hp = maxHp;
        this.toDestroy = false;
    }

    update() {
        this.x += this.stepForce * this.direction;

        // checking toDestroy
        if (this.hp <= 0 || this.x > width || this.x < 0) {
            this.toDestroy = true;
        }
    }

    render() {
        image(textureBullet, this.x, this.y, this.size, this.size);
    }
}