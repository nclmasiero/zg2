class formNewAccount {
    static initialize() {
        Controller.setBackground(color(51));

        this.accountName = "";
        this.nameMaxLength = 13;

        this.titleSize = map(width, 0, 2000, 0, 200);
        this.instructionsSize = map(width, 0, 2000, 0, 50);
        this.nameSize = map(width, 0, 2000, 0, 150);

        this.buttonsWidth = map(width, 0, 2000, 0, 300);
        this.buttonsHeight = map(width, 0, 2000, 0, 150);
        this.buttonsTextSize = map(width, 0, 2000, 0, 70);

        this.buttonDone = new objectButton(width / 2, height - this.buttonsHeight, this.buttonsWidth, this.buttonsHeight, "Done", this.buttonsTextSize);

        this.buttons = new Array(this.buttonDone);
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
        text("New Account", width / 2, defaultTitleY);

        // rendering instructions
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.instructionsSize);
        text("Type your name:", width / 2, defaultTitleY + height / 7);

        // rendering name
        noStroke();
        fill(0, 200, 0);
        if (this.accountName.length > this.nameMaxLength) fill(200, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(this.nameSize);
        text(this.accountName, width / 2, height / 2);

        // rendering error message
        if (this.accountName.length > this.nameMaxLength) {
            noStroke();
            fill(200, 0, 0);
            textAlign(CENTER, CENTER);
            textSize(this.instructionsSize);
            text("This nickname is too long.", width / 2, height / 2 + height / 4);
        }
    }

    static keyTyped() {
        if (key != ' ' && keyCode != ENTER) {
            this.accountName += key;
        }
    }

    static keyPressed() {
        if (keyCode == BACKSPACE) {
            this.accountName = this.accountName.substring(0, this.accountName.length - 1);
        }
    }

    static mousePressed() {
        if (this.buttonDone.hovered) {
            audioClick.play();
            if (this.createAccount()) Controller.setForm(formTitle);
        }
    }

    static createAccount() {
        if (this.accountName.length <= this.nameMaxLength) {
            localStorage.plinKnown = true;
            localStorage.plinName = this.accountName;
            localStorage.plinMaxScore = 0;
            localStorage.plinMoney = 0;
            localStorage.plinLevel = 1;
            localStorage.plinExperience = 0;
            localStorage.unlMiles = true;
            return true;
        } else {
            return false;
        }

    }
}