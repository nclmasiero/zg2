class formPlay {
    static initialize() {
        Controller.setBackground(color(50, 50, 100));
        Controller.disablePointer();

        // creating variables
        this.floorLevel = height - height / 8;
        this.score = 0;
        this.paused = false;

        // creating arrays
        this.bullets = new Array();
        this.zombies = new Array();
        this.dimos = new Array();
        this.particles = new Array();
        this.boosts = new Array();
        this.stars = new Array();

        // initializing spawner
        objectSpawner.initialize();
    }

    static createPlayer(character) {
        // creating player
        this.player = new character(width / 2, height / 2);
    }

    static update() {
        if (!this.paused) {
            // updating player
            this.player.update();

            // updating spawner
            objectSpawner.update();

            // updating boosts
            for (var i = this.boosts.length - 1; i >= 0; i--) {
                var boost = this.boosts[i];
                boost.update();
                if (boost.toDestroy) this.boosts.splice(i, 1);
            }

            // updating bullets
            for (var i = this.bullets.length - 1; i >= 0; i--) {
                var bullet = this.bullets[i];
                bullet.update();
                if (bullet.toDestroy) this.bullets.splice(i, 1);
            }

            // updating zombies
            for (var i = this.zombies.length - 1; i >= 0; i--) {
                var zombie = this.zombies[i];
                zombie.update();
                if (zombie.toDestroy) {
                    this.zombies.splice(i, 1);
                    objectParticle.createEffect(zombie.x, zombie.y, 5, 40, color(50, 100, 0), 3);
                }
            }

            // updating dimos
            for (var i = this.dimos.length - 1; i >= 0; i--) {
                var dimo = this.dimos[i];
                dimo.update();
                if (dimo.toDestroy) {
                    this.dimos.splice(i, 1);
                    objectParticle.createEffect(dimo.x, dimo.y, 6, 50, color(100, 0, 50), 5);
                }
            }

            // updating particles
            for (var i = this.particles.length - 1; i >= 0; i--) {
                var particle = this.particles[i];
                particle.update();
                if (particle.toDestroy) this.particles.splice(i, 1);
            }

            // updating stars
            for (var i = this.stars.length - 1; i >= 0; i--) {
                var star = this.stars[i];
                star.update();
                if (star.toDestroy) {
                    this.stars.splice(i, 1);
                    objectParticle.createEffect(star.x, star.y, 5, 30, color(200, 200, 50), 3);
                }
            }

            // checking pausing
            if (keyIsDown(27) || !focused) this.paused = true; // esc

        } else {
            if (keyIsDown(77)) Controller.setForm(formMenu); // m
            if (keyIsDown(81)) this.paused = false; // q
        }

    }

    static render() {
        // rendering background
        noStroke();
        fill(0, 50, 0);
        rectMode(CORNER);
        rect(0, this.floorLevel, width, height);

        // rendering boosts
        for (var boost of this.boosts) {
            boost.render();
        }

        // rendering zombies
        for (var zombie of this.zombies) {
            zombie.render();
        }

        // rendering dimos
        for (var dimo of this.dimos) {
            dimo.render();
        }

        // rendering stars
        for (var star of this.stars) {
            star.render();
        }

        // rendering bullets
        for (var bullet of this.bullets) {
            bullet.render();
        }

        // rendering player
        this.player.render();

        // rendering particles
        for (var particle of this.particles) {
            particle.render();
        }

        // rendering gui
        objectGui.renderScore();
        objectGui.renderPlayerHpBar();
        objectGui.renderPlayerAmmo();
        objectGui.renderPlayerUltimateBar();
        if (this.player.reloadingDelay > 0) objectGui.renderPlayerReloadingBar();
        if (this.paused) objectGui.renderPause();
        if (this.player.mag <= 0) objectGui.renderPlayerReloadButton();
        objectGui.renderPlayerLowHp();
    }
}