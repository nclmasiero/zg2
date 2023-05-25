class characterTank {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.w = 70;
        this.h = 70;
        this.imageRight = textureTankRight;
        this.imageLeft = textureTankLeft;
        this.image = this.imageRight;
        this.stepForce = 4;
        this.jumpForce = 10;
        this.maxMag = 14;
        this.maxAmmo = 60;
        this.maxShotDelay = 45;
        this.maxReloadingDelay = 70;
        this.maxHp = 800;
        this.bulletDamage = 400;
        this.maxUltimateDelay = 900;
        this.passiveFrequency = 20;
        this.hurtAudio = audioTankHurt;

        this.passiveStrength = 400;

        this.direction = 1;
        this.ySpeed = 0;
        this.onFloor = false;
        this.shotDelay = 0;
        this.ammo = this.maxAmmo;
        this.mag = this.maxMag;
        this.reloadingDelay = 0;
        this.hp = this.maxHp;
        this.ultimateDelay = this.maxUltimateDelay;
    }

    static getStats() {
        var temp = new characterTank(0, 0);
        var agility = round((temp.stepForce + temp.jumpForce) / 2)
        var stats = "HP: " + temp.maxHp + "\nDAMAGE: " + temp.bulletDamage + "\nAGILITY: " + agility + "\nMAG SIZE: " + temp.maxMag;
        return stats;
    }

    static getAbilities() {
        var passive = "PASSIVE: damages nearby enemies.";
        var ultimate = "ULTIMATE: gain a big amount of health.";
        return passive + "\n" + ultimate;
    }

    static getPrice() {
        return 500;
    }

    update() {
        // applying gravity
        this.y += this.ySpeed;
        this.ySpeed += gravity;

        // checking floor
        if (this.y + this.h / 2 > formPlay.floorLevel) {
            this.y = formPlay.floorLevel - this.h / 2;
            this.onFloor = true;
        } else {
            this.onFloor = false;
        }

        // checking keyboard
        if (keyIsDown(68)) {
            this.image = this.imageRight;
            this.x += this.stepForce;
            this.direction = 1;
        }
        if (keyIsDown(65)) {
            this.image = this.imageLeft;
            this.x -= this.stepForce;
            this.direction = -1;
        }
        if (keyIsDown(87) && this.onFloor) {
            this.ySpeed = -this.jumpForce;
        }
        if (keyIsDown(32) && this.shotDelay <= 0 && this.mag > 0 && this.reloadingDelay <= 0) {
            this.shoot(); // space
        }
        if (keyIsDown(82) && this.mag < this.maxMag && this.ammo > 0) {
            this.reload(); // R
        }
        if (keyIsDown(83) && this.ultimateDelay <= 0) {
            this.ultimate(); // S
        }

        // checking borders
        if (this.x + this.w / 2 > width) this.x = width - this.w / 2;
        if (this.x - this.w / 2 < 0) this.x = this.w / 2;

        // updating delays
        if (this.shotDelay > 0) this.shotDelay -= 1;
        if (this.reloadingDelay > 0) this.reloadingDelay -= 1;
        if (this.ultimateDelay > 0) this.ultimateDelay -= 1;

        // updating passive
        if (frameCount % this.passiveFrequency == 0) {
            this.passive();
        }

        // checking hp <= 0 / game over
        if (this.hp <= 0) {
            Controller.setForm(formGameOver);
        }

        // ultimate ready sound
        if (this.ultimateDelay == 1) {
            audioUltimateReady.play();
        }

        // ultimate ready aura
        if (this.ultimateDelay <= 0) {
            var particleX = random(this.x - this.w / 2, this.x + this.w / 2);
            var particleY = random(this.y - this.h / 2, this.y + this.h / 2);
            if (frameCount % 3 == 0) objectParticle.createEffect(particleX, particleY, 4, 1, color(100, 0, 200), 4);
        }
    }

    render() {
        // rendering image
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
    }

    shoot() {
        // creating the bullet
        var bullet = new objectBullet(this.x, this.y + this.h / 4, this.direction, this.bulletDamage);
        formPlay.bullets.push(bullet);

        // updating shot delay
        this.shotDelay = this.maxShotDelay;

        // updating mag
        this.mag -= 1;

        // sound
        audioShotgunShot.play();
    }

    reload() {
        // updating reloadingDelay
        this.reloadingDelay = this.maxReloadingDelay;

        // reloading
        if (this.ammo < this.maxMag - this.mag) {
            this.mag = this.mag + this.ammo;
            this.ammo = 0;
        } else {
            this.ammo -= this.maxMag - this.mag;
            this.mag = this.maxMag;
        }

        // playing sound
        audioReload.play();
    }

    passive() {
        for (var zombie of formPlay.zombies) {
            if (dist(zombie.x, zombie.y, this.x, this.y) <= this.w) {
                zombie.hp -= this.passiveStrength;
            }
        }

        for (var dimo of formPlay.dimos) {
            if (dist(dimo.x, dimo.y, this.x, this.y) <= this.w) {
                dimo.hp -= this.passiveStrength;
            }
        }
    }

    ultimate() {
        // applying effect
        this.hp += this.maxHp / 2;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
        // plying sound
        audioTankUltimate.play();
        // setting the delay to max
        this.ultimateDelay = this.maxUltimateDelay;
    }
}