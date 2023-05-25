class objectSpawner {
    static initialize() {
        this.spawnEnemies = true;
        this.zombieSpawnRate = 200;
        this.dimoSpawnRate = 500;
        this.boostSpawnRate = 600;
    }

    static update() {
        // checking rates
        if (frameCount % this.zombieSpawnRate == 0 && this.spawnEnemies) this.spawnZombie();
        if (frameCount % this.dimoSpawnRate == 0 && this.spawnEnemies) this.spawnDimo();
        if (formPlay.boosts.length < 4) if (frameCount % this.boostSpawnRate == 0) this.spawnBoost();

        // updating rates
        if (frameCount % 60 == 0) {
            this.zombieSpawnRate -= 1;
            this.dimoSpawnRate -= 1;
            this.boostSpawnRate -= 1;
        }

        // checking rates limits
        if (this.zombieSpawnRate < 60) this.zombieSpawnRate = 60;
        if (this.dimoSpawnRate < 120) this.dimoSpawnRate = 120;
        if (this.boostSpawnRate < 120) this.boostSpawnRate = 120;
    }

    static getSpawnPos(gap) {
        var randomFactor = round(random(0, 1));
        if (randomFactor == 1) return width + gap;
        else return -gap;
    }

    static getBoostType() {
        if (formPlay.player.hp < formPlay.player.maxHp / 2) {
            var randomFactor = round(random(1, 5))
            if (randomFactor == 1 || randomFactor == 2 || randomFactor == 3) return "health";
            if (randomFactor == 4) return "ammo";
            if (randomFactor == 5) return "ultimate";
        } else {
            var randomFactor = round(random(1, 3));
            if (randomFactor == 1 || randomFactor == 2) return "ammo";
            if (randomFactor == 3) return "ultimate";
        }
    }

    static getBoostColor(type) {
        if (type == "ammo") return color(150, 150, 0);
        if (type == "health") return color(150, 0, 0);
        if (type == "ultimate") return color(0, 0, 150);
    }

    static spawnZombie() {
        var zombie = new objectZombie(this.getSpawnPos(300), 0);
        formPlay.zombies.push(zombie);
    }

    static spawnDimo() {
        var dimo = new objectDimo(this.getSpawnPos(300), 0);
        formPlay.dimos.push(dimo);
    }

    static spawnBoost() {
        var xSpawn = random(width);
        var type = this.getBoostType();
        var boost = new objectBoost(xSpawn, formPlay.floorLevel - 100, type);
        objectParticle.createEffect(xSpawn, formPlay.floorLevel - 100, 5, 40, this.getBoostColor(type), 3);
        formPlay.boosts.push(boost);
    }
}