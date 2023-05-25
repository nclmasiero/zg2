class formMiles {
    static initialize() {
        Controller.setBackground(color(51));

        this.titleSize = map(width, 0, 2000, 0, 200);
        this.statsSize = map(width, 0, 2000, 0, 50);

        this.buttonsWidth = map(width, 0, 2000, 0, 300);
        this.buttonsHeight = map(width, 0, 2000, 0, 150);
        this.buttonsTextSize = map(width, 0, 2000, 0, 70);

        this.buttonBack = new objectButtonBack(60, 60, 100, 100);
        // buy button
        this.charPrice = characterMiles.getPrice();
        this.userMoney = Number(localStorage.plinMoney);
        this.charUnlocked = Boolean(localStorage.unlMiles);
        this.buyText = "Buy ($" + this.charPrice + ")";
        this.isBuyButtonLocked = this.charUnlocked || this.userMoney < this.charPrice;
        this.buttonBuy = new objectButton(width / 2, height - this.buttonsHeight, this.buttonsWidth, this.buttonsHeight, this.buyText, this.buttonsTextSize, this.isBuyButtonLocked);
        //
        this.buttons = new Array(this.buttonBack, this.buttonBuy);
    }

    static update() {
        // updating buttons
        for (var button of this.buttons) {
            button.update();
        }
    }

    static render() {
        // rendering buttons
        for (var button of this.buttons) {
            button.render();
        }

        // rendering title
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.titleSize);
        text("Miles", width / 2, defaultTitleY);

        // rendering money
        objectGui.renderUserMoney();

        // rendering char stats
        var stats = characterMiles.getStats();
        noStroke();
        fill(255);
        textAlign(RIGHT);
        textSize(this.statsSize);
        text(stats, width - 30, height / 2);

        // rendering char abilities
        var abilities = characterMiles.getAbilities();
        noStroke();
        fill(255);
        textAlign(LEFT);
        textSize(this.statsSize);
        text(abilities, 30, height / 2);

        // rendering owned text
        var ownedSize = map(width, 0, 2000, 0, 100);
        noStroke();
        fill(0, 200, 0);
        textAlign(CENTER);
        textSize(ownedSize);
        if (this.charUnlocked) text("Owned", width / 2, defaultTitleY + height / 8);
    }

    static mousePressed() {
        if (this.buttonBack.hovered) {
            audioClick.play();
            Controller.setForm(formCharacters);
        }
        if (this.buttonBuy.hovered) {
            audioClick.play();
            if (Number(localStorage.plinMoney) >= characterMiles.getPrice()) {
                // unlocking char
                localStorage.unlMiles = true;
                this.buttonBuy.locked = true;
                localStorage.plinMoney = Number(localStorage.plinMoney) - characterMiles.getPrice();
                this.charUnlocked = true;
                // applying effects
                audioCharacterUnlocked.play();
            }

        }
    }
}