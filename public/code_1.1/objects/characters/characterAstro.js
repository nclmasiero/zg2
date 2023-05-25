class characterAstro {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.w = 60;
        this.h = 60;
        this.imageRight = textureAstroRight;
        this.imageLeft = textureAstroLeft;
        this.image = this.imageRight;
        this.stepForce = 6;
        this.jumpForce = 12;
        this.maxMag = 20;
        this.maxAmmo = 80;
        this.maxShotDelay = 30;
        this.maxReloadingDelay = 60;
        this.maxHp = 450;
        this.bulletDamage = 100;
        this.maxUltimateDelay = 1600;
        this.passiveFrequency = 0;
        this.hurtAudio = audioAstroHurt;
        this.maxUltimateDuration = 140; // don't change due to the audio

        this.direction = 1;
        this.ySpeed = 0;
        this.onFloor = false;
        this.shotDelay = 0;
        this.ammo = this.maxAmmo;
        this.mag = this.maxMag;
        this.reloadingDelay = 0;
        this.hp = this.maxHp;
        this.ultimateDelay = this.maxUltimateDelay;
        this.ultimateDuration = 0;
    }

    static getStats() {
        var temp = new characterAstro(0, 0);
        var agility = round((temp.stepForce + temp.jumpForce) / 2)
        var stats = "HP: " + temp.maxHp + "\nDAMAGE: " + temp.bulletDamage + "\nAGILITY: " + agility + "\nMAG SIZE: " + temp.maxMag;
        return stats;
    }

    static getAbilities() {
        var passive = "PASSIVE: shoots two bullets per time.";
        var ultimate = "ULTIMATE: makes the sky angry.";
        return passive + "\n" + ultimate;
    }

    static getPrice() {
        return 800;
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
        if (this.ultimateDuration > 0) this.ultimateDuration -= 1;

        // updating passive
        if (frameCount % this.passiveFrequency == 0) {
            this.passive();
        }

        // checking hp <= 0 / game over
        if (this.hp <= 0) {
            Controller.setForm(formGameOver);
        }

        // applying ultimate
        if (this.ultimateDuration > 0) {
            if (frameCount % 2 == 0) {
                var star = new objectStar(random(width), -100, 30, 30, 500, 20);
                formPlay.stars.push(star);
            }
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
        var bullet = new objectBullet(this.x, this.y + this.h / 4 - 5, this.direction, this.bulletDamage);
        formPlay.bullets.push(bullet);

        // updating shot delay
        this.shotDelay = this.maxShotDelay;

        // updating mag
        this.mag -= 1;

        // sound
        audioRifleShot.play();
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
        // shoots two bullets per time
    }

    ultimate() {
        // applying effect
        this.ultimateDuration = this.maxUltimateDuration;
        // setting the delay to max
        this.ultimateDelay = this.maxUltimateDelay;
        // playing audio
        audioAstroUltimate.play();
    }
}