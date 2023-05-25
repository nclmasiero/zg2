class objectZombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.w = 60;
        this.h = 60;
        this.stepForce = 3;
        this.maxHp = 200;
        this.maxAttackDelay = 60;
        this.damage = 70;
        this.scoreGiven = 10;
        this.imageRight = textureZombieRight;
        this.imageLeft = textureZombieLeft;
        this.audioDead = audioZombieDead;

        this.image = this.imageRight;
        this.direction = -1;
        this.ySpeed = 0;
        this.hp = this.maxHp;
        this.toDestroy = false;
        this.attackDelay = 0;
    }

    update() {
        // applying gravity
        this.y += this.ySpeed;
        this.ySpeed += gravity;

        // checking floor
        if (this.y + this.h / 2 > formPlay.floorLevel) {
            this.y = formPlay.floorLevel - this.h / 2;
            this.ySpeed = 0;
        }

        // changing direction
        if (this.x < formPlay.player.x) {
            this.direction = 1;
            this.image = this.imageRight;
        } else if (this.x > formPlay.player.x) {
            this.direction = -1;
            this.image = this.imageLeft;
        }

        // moving and checking distance
        if (dist(this.x, 0, formPlay.player.x, 0) >= this.w / 2) {
            this.x += this.stepForce * this.direction;
        } else {
            // checking collision with player
            if (this.y + this.h / 2 > formPlay.player.y - formPlay.player.h / 2 && this.y - this.h / 2 < formPlay.player.y + formPlay.player.h / 2) {
                if (this.attackDelay <= 0) this.attack();
            }
        }

        // checking collision with bullets
        for (var bullet of formPlay.bullets) {
            var checkXCollision = bullet.x > this.x - this.w / 2 && bullet.x < this.x + this.w / 2;
            var checkYCollision = bullet.y > this.y - this.h / 2 && bullet.y < this.y + this.h / 2;
            if (checkXCollision && checkYCollision) {
                this.hp -= bullet.damage;
                bullet.hp -= 1;
                if (this.hp > 0) audioEnemyHit.play();
            }
        }

        // checking collision with stars
        for (var star of formPlay.stars) {
            var checkXCollision = star.x - star.w / 2 < this.x + this.w / 2 && star.x + star.w / 2 > this.x - this.w / 2;
            var checkYCollision = star.y - star.h / 2 < this.y + this.h / 2 && star.y + star.h / 2 > this.y - this.h / 2;
            if (checkXCollision && checkYCollision) {
                this.hp -= star.damage;
                star.toDestroy = true;
                if (this.hp > 0) audioEnemyHit.play();
            }
        }

        // checking toDestroy
        if (this.hp <= 0) {
            this.toDestroy = true;
            formPlay.score += this.scoreGiven;
            this.audioDead.play();
        }

        // updating attackDelay
        if (this.attackDelay > 0) this.attackDelay -= 1;
    }

    render() {
        // rendering texture
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);

        if (this.hp < this.maxHp) {
            // rendering hp bad
            rectMode(CORNER);
            var outlineLength = this.w * 1.5;
            var inlineLength = map(this.hp, 0, this.maxHp, 0, outlineLength);
            //outline
            noFill();
            stroke(255);
            strokeWeight(2);
            rect(this.x - outlineLength / 2, this.y - this.h, outlineLength, 10);
            //inline
            fill(200, 0, 0);
            noStroke();
            rect(this.x - outlineLength / 2, this.y - this.h, inlineLength, 10);
        }
    }

    attack() {
        // attacking
        formPlay.player.hp -= this.damage;
        this.attackDelay = this.maxAttackDelay;
        // player hurt audio
        audioGenericHurt.play();
        if (round(random(0, 2)) == 1) formPlay.player.hurtAudio.play();
        // effect
        objectParticle.createEffect(formPlay.player.x, formPlay.player.y, 5, 40, color(200, 0, 0), 10);
    }
}