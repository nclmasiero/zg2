class formCharacters {
    static initialize() {
        Controller.setBackground(51);

        this.titleSize = map(width, 0, 2000, 0, 200);

        this.buttonsWidth = map(width, 0, 2000, 0, 300);
        this.buttonsHeight = map(width, 0, 2000, 0, 150);
        this.buttonsTextSize = map(width, 0, 2000, 0, 70);

        this.buttonBack = new objectButtonBack(60, 60, 100, 100);
        this.buttonMiles = new objectButton(width / 2 - width / 8, height / 2, this.buttonsWidth, this.buttonsHeight, "Miles", this.buttonsTextSize);
        this.buttonTank = new objectButton(width / 2 + width / 8, height / 2, this.buttonsWidth, this.buttonsHeight, "Tank", this.buttonsTextSize);
        this.buttonAstro = new objectButton(width / 2 + width / 8, height / 2 + this.buttonsHeight + 10, this.buttonsWidth, this.buttonsHeight, "Astro", this.buttonsTextSize);

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
        text("Characters", width / 2, defaultTitleY);

        // rendering money
        objectGui.renderUserMoney();
    }

    static mousePressed() {
        if (this.buttonBack.hovered) {
            audioClick.play();
            Controller.setForm(formMenu);
        }
        if (this.buttonMiles.hovered) {
            audioClick.play();
            Controller.setForm(formMiles);
        }
        if (this.buttonTank.hovered) {
            audioClick.play();
            Controller.setForm(formTank);
        }
        if (this.buttonAstro.hovered) {
            audioClick.play();
            Controller.setForm(formAstro);
        }
    }
}