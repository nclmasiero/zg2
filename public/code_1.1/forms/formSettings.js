class formSettings {
    static initialize() {
        Controller.setBackground(color(51));

        this.titleSize = map(width, 0, 2000, 0, 200);
        this.textSettingNameSize = map(width, 0, 2000, 0, 100);
        this.textSettingSize = map(width, 0, 2000, 0, 100);
        this.buttonsSize = map(width, 0, 2000, 0, 100);

        this.buttonBack = new objectButtonBack(60, 60, 100, 100);
        this.buttonVolumeDown = new objectButton(width - width / 3, height / 2, this.buttonsSize, this.buttonsSize, "-", 64)
        this.buttonVolumeUp = new objectButton(width - width / 6, height / 2, this.buttonsSize, this.buttonsSize, "+", 64)
        this.buttons = new Array(this.buttonBack, this.buttonVolumeUp, this.buttonVolumeDown);
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
        text("Settings", width / 2, defaultTitleY);

        // rendering setting name volume
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.textSettingNameSize);
        text("Volume:", width / 4, height / 2);

        // rendering setting volume
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.textSettingSize);
        text(localStorage.settingVolume, width - width / 4, height / 2);
    }

    static mousePressed() {
        if (this.buttonBack.hovered) {
            Controller.setForm(formMenu);
            audioClick.play();
        }
        if (this.buttonVolumeUp.hovered) {
            if (int(localStorage.settingVolume) < 10) {
                localStorage.settingVolume = int(localStorage.settingVolume) + 1;
                audioClick.play();
            }
        }
        if (this.buttonVolumeDown.hovered) {
            if (int(localStorage.settingVolume) > 0) {
                localStorage.settingVolume = int(localStorage.settingVolume) - 1;
                audioClick.play();
            }
        }
    }
}