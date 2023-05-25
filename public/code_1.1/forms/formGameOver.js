class formGameOver {
    static initialize() {
        Controller.setBackground(color(100, 0, 0));

        this.titleSize = map(width, 0, 2000, 0, 200);
        this.gainsSize = map(width, 0, 2000, 0, 50);

        this.score = formPlay.score;
        this.gainedExperience = round(this.score / 100);
        this.gainedMoney = round(this.score / 20);
        if (this.score > Number(localStorage.plinMaxScore)) localStorage.plinMaxScore = this.score;
        this.maxScore = localStorage.plinMaxScore;

        this.applyGains();

        this.buttonsWidth = map(width, 0, 2000, 0, 300);
        this.buttonsHeight = map(width, 0, 2000, 0, 150);
        this.buttonsTextSize = map(width, 0, 2000, 0, 70);

        this.buttonRetry = new objectButton(width / 2, height - this.buttonsHeight, this.buttonsWidth, this.buttonsHeight, "Retry", this.buttonsTextSize);
        this.buttonBack = new objectButtonBack(60, 60, 100, 100);
        this.buttons = new Array(this.buttonRetry, this.buttonBack);
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

        // rendering Game Over text
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.titleSize);
        text("Game Over", width / 2, defaultTitleY);

        // rendering gains
        var gainsText = "Score: " + this.score + "\nMax Score: " + this.maxScore + "\nGained Experience: " + this.gainedExperience + "\nGained Money: " + this.gainedMoney;
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.gainsSize);
        text(gainsText, width / 2, height / 2);
    }

    static mousePressed() {
        if (this.buttonRetry.hovered) {
            audioClick.play();
            Controller.setForm(formSelectCharacter);
        }
        if (this.buttonBack.hovered) {
            audioClick.play();
            Controller.setForm(formMenu);
        }
    }

    static applyGains() {
        localStorage.plinExperience = Number(localStorage.plinExperience) + this.gainedExperience;
        localStorage.plinMoney = Number(localStorage.plinMoney) + this.gainedMoney;
        while (Number(localStorage.plinExperience >= 100)) {
            localStorage.plinExperience = Number(localStorage.plinExperience) - 100;
            localStorage.plinLevel = Number(localStorage.plinLevel) + 1;
        }
    }
}