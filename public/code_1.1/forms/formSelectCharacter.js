class formSelectCharacter {
    static initialize() {
        Controller.setBackground(51);

        this.titleSize = map(width, 0, 2000, 0, 150);

        this.buttonsWidth = map(width, 0, 2000, 0, 300);
        this.buttonsHeight = map(width, 0, 2000, 0, 150);
        this.buttonsTextSize = map(width, 0, 2000, 0, 70);

        this.buttonMiles = new objectButton(width / 2 - width / 8, height / 2, this.buttonsWidth, this.buttonsHeight, "Miles", this.buttonsTextSize, !Boolean(localStorage.unlMiles));
        this.buttonTank = new objectButton(width / 2 + width / 8, height / 2, this.buttonsWidth, this.buttonsHeight, "Tank", this.buttonsTextSize, !Boolean(localStorage.unlTank));
        this.buttonAstro = new objectButton(width / 2 + width / 8, height / 2 + this.buttonsHeight + 10, this.buttonsWidth, this.buttonsHeight, "Astro", this.buttonsTextSize, !Boolean(localStorage.unlAstro));

        this.buttonBack = new objectButtonBack(60, 60, 100, 100);

        this.buttons = new Array(this.buttonBack, this.buttonMiles, this.buttonTank, this.buttonAstro);
    }

    static update() {
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
        text("Select Character", width / 2, defaultTitleY);
    }

    static mousePressed() {
        if (this.buttonBack.hovered) {
            audioClick.play();
            Controller.setForm(formMenu);
        }
        if (this.buttonMiles.hovered) {
            audioClick.play();
            formPlay.createPlayer(characterMiles);
            Controller.setForm(formPlay);
        }
        if (this.buttonTank.hovered) {
            audioClick.play();
            formPlay.createPlayer(characterTank);
            Controller.setForm(formPlay);
        }
        if (this.buttonAstro.hovered) {
            audioClick.play();
            formPlay.createPlayer(characterAstro);
            Controller.setForm(formPlay);
        }
    }
}