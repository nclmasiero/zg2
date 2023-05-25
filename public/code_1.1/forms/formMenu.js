class formMenu {
    static initialize() {
        Controller.setBackground(color(51));

        this.titleSize = map(width, 0, 2000, 0, 200);

        this.buttonsWidth = map(width, 0, 2000, 0, 300);
        this.buttonsHeight = map(width, 0, 2000, 0, 150);
        this.buttonsTextSize = map(width, 0, 2000, 0, 70);

        this.buttonPlay = new objectButton(width / 2, height / 2 - this.buttonsHeight - 20, this.buttonsWidth, this.buttonsHeight, "Play", this.buttonsTextSize);
        this.buttonCharacters = new objectButton(width / 2, height / 2, this.buttonsWidth, this.buttonsHeight, "Characters", this.buttonsTextSize);
        this.buttonSettings = new objectButton(width / 2, height / 2 + this.buttonsHeight + 20, this.buttonsWidth, this.buttonsHeight, "Settings", this.buttonsTextSize);
        this.buttons = new Array(this.buttonPlay, this.buttonCharacters, this.buttonSettings);
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
        text("Menu", width / 2, defaultTitleY);

        // rendering player's info
        objectGui.renderUserName();
        objectGui.renderUserLevel();
        objectGui.renderUserExperience();
        objectGui.renderUserMaxScore();
        objectGui.renderVersion();
    }

    static mousePressed() {
        if (this.buttonPlay.hovered) {
            audioClick.play();
            Controller.setForm(formSelectCharacter);
        }
        if (this.buttonSettings.hovered) {
            audioClick.play();
            Controller.setForm(formSettings);
        }
        if (this.buttonCharacters.hovered) {
            audioClick.play();
            Controller.setForm(formCharacters);
        }
    }
}