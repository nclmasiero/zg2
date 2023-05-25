class objectBoost {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.type = type; // ammo, health, ultimate
        this.image = this.getImage();
        this.toDestroy = false;
        this.ySpeed = 0;

        this.ammoBoost = 20;
        this.healthBoost = 200;
        this.ultimateBoost = 300;
    }

    update() {
        // applying gravity
        this.ySpeed += gravity;
        this.y += this.ySpeed;

        // checking floor
        if (this.y + this.h / 2 > formPlay.floorLevel) {
            this.y = formPlay.floorLevel - this.h / 2;
            this.ySpeed = 0;
        }

        // collision with player
        var px = formPlay.player.x;
        var py = formPlay.player.y;
        if (dist(px, py, this.x, this.y) < this.w) {
            this.applyEffect();
            this.toDestroy = true;
            audioBoostTaken.play();
        }
    }

    render() {
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
    }

    getImage() {
        if (this.type == "ammo") {
            return textureBoostAmmo;
        } else if (this.type == "health") {
            return textureBoostHealth;
        } else if (this.type == "ultimate") {
            return textureBoostUltimate;
        } else {
            this.type = "ammo";
            return textureBoostAmmo;
        }
    }

    applyEffect() {
        switch (this.type) {
            case "ammo":
                formPlay.player.ammo += this.ammoBoost;
                if (formPlay.player.ammo > formPlay.player.maxAmmo) formPlay.player.ammo = formPlay.player.maxAmmo;
                break;
            case "health":
                formPlay.player.hp += this.healthBoost;
                if (formPlay.player.hp > formPlay.player.maxHp) formPlay.player.hp = formPlay.player.maxHp;
                break;
            case "ultimate":
                formPlay.player.ultimateDelay -= this.ultimateBoost;
                if (formPlay.player.ultimateDelay < 2) formPlay.player.ultimateDelay = 2; // 2 to play the ultimate ready sound
                break;
        }
    }
}